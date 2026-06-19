"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { loginSchema } from "@/lib/validations/auth";

/**
 * Handles user authentication and enforces the Email Verification Guardrail.
 * 
 * Architecture Note:
 * This action safely authenticates the user via Better Auth and checks their verification status.
 * If the user's email is unverified, it intercepts the standard login flow, manually dispatches
 * the Verification OTP email, and flags the frontend to redirect the user to the OTP page.
 * This guarantees unverified users cannot access protected routes even if they have a session.
 * 
 * @param raw - The raw JSON payload from the login form.
 * @returns An object indicating success and verification status, or strongly typed error messages.
 */
export async function signinAction(raw: unknown) {
    // 1. Validate Input Payload
    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const { email, password } = parsed.data;
    let reqHeaders: Headers;

    // 2. Execute Better Auth Sign-In
    try {
        reqHeaders = await headers();
        
        // signInEmail securely checks the password hash and creates a session cookie.
        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: reqHeaders,
        });

        // 3. Verification Guardrail Intercept
        if (!result.user.emailVerified) {
            // User is authenticated but unverified. We must manually dispatch the OTP.
            // This ensures they receive a fresh OTP every time they try to log in unverified.
            try {
                await auth.api.sendVerificationOTP({
                    body: { email, type: "email-verification" },
                    headers: reqHeaders,
                });
            } catch (otpError) {
                console.error("[OTP_SEND_ERROR] Sign-in succeeded but OTP failed to dispatch:", otpError);
                // We do not fail the request; the user will land on the OTP page where they can click "Resend"
            }

            // Signal the frontend to route to /verify-otp
            return { success: true, isVerified: false };
        }

        // 4. Fully Verified Access
        // Signal the frontend to route to the protected dashboard
        return { success: true, isVerified: true };

    } catch (e) {
        console.error("[AUTH_SIGNIN_ERROR] Failed to authenticate user:", e);
        
        // Better Auth throws specific APIErrors for invalid credentials.
        // We sanitize the error message to avoid leaking database internals to the client.
        const message = e instanceof Error ? e.message : "Invalid email or password.";
        
        // Standardize the generic authentication error to the root key
        return { error: { root: [message] } };
    }
}
