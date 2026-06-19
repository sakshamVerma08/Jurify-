import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

export const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
    }
    return transporter;
};