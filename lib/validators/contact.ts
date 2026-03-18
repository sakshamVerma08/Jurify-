import { z } from "zod";

export const contactInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .max(255, { message: "Email must not exceed 255 characters." }),

  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, {
      message: "Please provide a valid 10-digit mobile number.",
    }),

  address: z
    .string()
    .trim()
    .min(10, { message: "Address must be at least 10 characters long." })
    .max(300, { message: "Address must not exceed 300 characters." }),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;