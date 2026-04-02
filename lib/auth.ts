// BETTER AUTH INSTANCE FILE

import {betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";

export const auth = betterAuth({

    database: prismaAdapter(prisma,{
        provider:"postgresql"
    }),

    trustedOrigins:["http://localhost:3000"],

    emailAndPassword:{
        enabled:true,
        requireEmailVerification:false,
    },

    // User block, which tells better-auth about custom fields that i'm adding in User model in our Schema.(Sak)

    /* ADD NODEMAILER CODE HERE, so that actual verification email can be sent to the user's mail ID"*/
    user:{
        additionalFields:{
            phoneNo:{
                type:"string",
                required:false,
            },
        }
    },

    /* CAN ADD SSO OPTIONS AS WELL */
    baseURL: process.env.BETTER_AUTH_URL,
    
    socialProviders:{

        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }
        

    
});