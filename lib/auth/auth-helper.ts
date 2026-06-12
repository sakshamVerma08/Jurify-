//Authentication guard for all routes.

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function requireAuth() {
    const reqHeaders = await headers();
    
    const session = await auth.api.getSession({
        headers: reqHeaders,
    });

    // Behind the scenes, better-auth does the following things:
    // 1. Reads session cookie from the request headers.
    // 2. Finds session in the database using the session cookie.
    // 3. Checks if the session doesn't exist, is invalid, or is expired.
    //    If so, returns null; otherwise returns the session object.

    if (!session) return null;
    // Throwing an error here could cause unhandled exceptions.
    // Since we are only verifying whether the session exists and is valid,
    // returning `null` is sufficient and safer than throwing an error.

    return session;
}