import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "@/lib/prisma/prisma";
import { getTransporter } from "@/lib/nodemailer/mailer";
import { getOTPTemplate } from "@/lib/nodemailer/templates/otp";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
            },
        },
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                // Fetch user to personalize the email with their first name
                const user = await prisma.user.findUnique({ where: { email } });
                const firstName = user?.name ? user.name.split(' ')[0] : "there";
                
                await getTransporter().sendMail({
                    from: `"Jurify" <${process.env.NODEMAILER_EMAIL}>`,
                    to: email,
                    subject: "Your Jurify verification code",
                    html: getOTPTemplate(otp, firstName),
                });
            },
            expiresIn: 300,
        }),
    ],
    session: {
        cookieCache: {
            enabled: false,
            maxAge: 60 * 5, // 5 min client-side cache
        },
    },
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL,
    trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL!],
    advanced: {
        useSecureCookies: false,
    }
});

export type Session = typeof auth.$Infer.Session;