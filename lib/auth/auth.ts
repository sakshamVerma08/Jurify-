import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "@/lib/prisma/prisma";
import { transporter } from "@/lib/nodemailer/mailer";
import { getOTPTemplate } from "@/lib/nodemailer/templates/otp";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                // Fetch user to personalize the email with their first name
                const user = await prisma.user.findUnique({ where: { email } });
                const firstName = user?.name ? user.name.split(' ')[0] : "there";
                
                await transporter.sendMail({
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
            enabled: true,
            maxAge: 60 * 5, // 5 min client-side cache
        },
    },
    trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL!],
});

export type Session = typeof auth.$Infer.Session;