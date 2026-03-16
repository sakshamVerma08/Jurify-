// BETTER AUTH INSTANCE FILE

import {betterAuth} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import {PrismaClient} from "@/generated/prisma";
import {PrismaPg} from "@prisma/adapter-pg";

// This Prisma Adapter is used with the new Prisma Client in Prisma- v7.
// Also we are using supabase with pooler connection, so Prisma Adapters are needed anyway.
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL_DEVELOPMENT
});

const prisma = new PrismaClient({adapter});

export const auth = betterAuth({

    database: prismaAdapter(prisma,{
        provider:"postgresql"
    }),

    emailAndPassword:{
        enabled:true,
    },

    // User block, which tells better-auth about custom fields that i'm adding in User model in our Schema.(Sak)

    user:{
        additionalFields:{
            phoneNo:{
                type:"string",
                required:false,
            },

            /*role:{
                type:"string",
                required:false,
            }*/
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