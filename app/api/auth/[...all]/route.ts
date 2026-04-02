// Data is coming from /register/page.tsx (frontend).
// This route just passes the request along to auth.ts in /lib.

import {auth} from "@/lib/auth";
import {toNextJsHandler} from "better-auth/next-js";

export const {POST,GET} = toNextJsHandler(auth);