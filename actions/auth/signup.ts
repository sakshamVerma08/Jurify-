"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";
import { registerSchema } from "@/lib/validations/auth";

/**
 * Handles the registration of a new user.
 * 
 * Architecture Note:
 * This action uses a Multi-Step Compensating Transaction pattern.
 * 
 * Step 1: User is created via Better Auth (`signUpEmail`). This handles password hashing
 *         and session creation natively.
 * Step 2: An Array-Based Prisma Transaction updates the core `User` role and inserts
 *         into the specialized `LawyerProfile` or `ClientProfile` tables in a single round-trip.
 * Step 3: If Step 2 fails (e.g., database constraints), we manually execute a Rollback (Compensating Transaction)
 *         to delete the orphaned user, maintaining database integrity.
 * Step 4: OTP dispatch is decoupled and triggered manually to bypass internal Better Auth 
 *         transaction collisions that occur when `requireEmailVerification` is true with Next.js Turbopack.
 * 
 * @param raw - The raw JSON payload from the registration form.
 * @returns An object containing either success state or strongly typed error messages.
 */
export async function signupAction(raw: unknown) {
    // 1. Validate Input Payload
    const parsed = registerSchema().safeParse(raw);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { role, firstName, lastName, email, phone, password, barCouncilState } = parsed.data;

    let userId: string = "";
    let reqHeaders: Headers;

    // 2. Execute Better Auth User Creation
    try {
        reqHeaders = await headers();
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: `${firstName} ${lastName}`,
            },
            headers: reqHeaders,
        });
        
        userId = result.user.id;
    } catch (e) {
        console.error("[AUTH_SIGNUP_ERROR] Failed to create user via Better Auth:", e);
        const message = e instanceof Error ? e.message : "Signup failed. Please try again.";
        return { error: { root: [message] } };
    }

    if (!userId) {
        return { error: { root: ["Signup failed due to internal error. Please try again."] } };
    }

    // 3. Atomically Create Domain Profiles via Array-Based Transaction
    try {
        // We construct the transaction array. The first operation updates the core user role.
        const operations: any[] = [
            prisma.user.update({
                where: { id: userId },
                data: { role: role as "CLIENT" | "LAWYER" },
            })
        ];

        // The second operation creates the role-specific profile.
        if (role === "CLIENT") {
            operations.push(
                prisma.clientProfile.create({
                    data: { userId, firstName, lastName, phone },
                })
            );
        } else {
            operations.push(
                prisma.lawyerProfile.create({
                    data: {
                        userId,
                        firstName,
                        lastName,
                        displayName: `${firstName} ${lastName}`,
                        phone,
                        barCouncilState,
                    },
                })
            );
        }

        // Execute sequentially but atomically on the DB server without holding a local connection lock
        await prisma.$transaction(operations);

        // 4. Manually trigger OTP Verification
        // Decoupled from `signUpEmail` to prevent internal transaction silent rollbacks in Better Auth v1.6+
        try {
            await auth.api.sendVerificationOTP({
                body: { email, type: "email-verification" },
                headers: reqHeaders,
            });
        } catch (otpError) {
            // We do not fail the request if OTP sending fails. 
            // The user account exists safely and they can request a new OTP later.
            console.error("[OTP_SEND_ERROR] Profile created but OTP failed to send:", otpError);
        }

    } catch (dbError) {
        console.error("[PROFILE_CREATION_ERROR] Transaction failed, initiating rollback:", dbError);

        // 5. Compensating Transaction (Rollback)
        try {
            await prisma.user.delete({
                where: { id: userId },
            });
            console.log(`[ROLLBACK_SUCCESS] Successfully deleted orphaned user: ${userId}`);
        } catch (rollbackError) {
            // Critical failure: Database is now out of sync (User exists without Profile)
            console.error(`[CRITICAL_ROLLBACK_FAILURE] Failed to delete orphaned user ${userId}. Manual cleanup required!`, rollbackError);
        }

        return { error: { root: ["Account setup failed due to a database error. Please try again."] } };
    }

    return { success: true };
}