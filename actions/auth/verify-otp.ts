"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function verifyOtpAction(email: string, otp: string) {
    try {
        await auth.api.verifyEmailOTP({
            body: { email, otp },
            headers: await headers(),
        });
        return { success: true };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Invalid or expired OTP";
        return { error: message };
    }
}
