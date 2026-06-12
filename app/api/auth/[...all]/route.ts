//Data will be sent by /login/page.tsx (frontend) and /register/page.tsx(frontend)
//This route will redirect the requests from /auth/[...all] to auth.ts in the lib/auth.

import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);