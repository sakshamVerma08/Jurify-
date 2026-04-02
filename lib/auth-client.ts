import {createAuthClient} from "better-auth/react";

// We are creating an authClient function here, using "creteAuthClient" in-built function from Better-Auth.
// This is exporting 3 functions from here, to the frontend, for use:
//1) signIn, 2) signUp, 3) useSession.

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const {signIn, signUp, useSession} = authClient;
