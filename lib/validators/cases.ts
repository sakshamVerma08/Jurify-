import { z } from "zod";

// All legal categories for cases
export const caseCategoryEnum = z.enum([
  "FAMILY_LAW",
  "CRIMINAL_LAW",
  "CIVIL_LAW",
  "CORPORATE_LAW",
  "PROPERTY_LAW",
  "LABOR_LAW",
  "TAX_LAW",
  "INTELLECTUAL_PROPERTY_LAW",
  "CONSTITUTIONAL_LAW",
  "ENVIRONMENTAL_LAW",
  "IMMIGRATION_LAW",
  "BANKING_LAW",
  "CYBER_LAW",
], {
  required_error: "Category is required.",
  invalid_type_error: "Please select a valid legal category.",
});

// Current stage of a case
export const caseStageEnum = z.enum([
  "INITIAL_CONSULTATION",
  "INVESTIGATION",
  "FILING",
  "HEARING",
  "TRIAL",
  "JUDGMENT",
  "APPEAL",
  "CLOSED",
], {
  required_error: "Current stage is required.",
});

// Urgency levels for prioritizing cases
export const urgencyEnum = z.enum(["LOW", "MEDIUM", "HIGH"], {
  invalid_type_error: "Please select a valid urgency level.",
});

// Main schema for creating a case
export const createCaseSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim() // Removes leading and trailing whitespace to prevent invalid inputs like "     "
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(255, { message: "Title must not exceed 255 characters." }),

  description: z
    .string({ required_error: "Description is required." })
    .trim()
    .min(20, { message: "Description must be at least 20 characters long." })
    .max(2000, { message: "Description must not exceed 2000 characters." }),

  // We store only city, state, and country to maintain user privacy while still enabling
  // location-based case matching. Full address details should be shared securely later if required.
  city: z
    .string({ required_error: "City is required." })
    .trim()
    .min(2, { message: "City must be at least 2 characters long." })
    .max(100, { message: "City must not exceed 100 characters." }),

  state: z
    .string({ required_error: "State is required." })
    .trim()
    .min(2, { message: "State must be at least 2 characters long." })
    .max(100, { message: "State must not exceed 100 characters." }),

  country: z
    .string()
    .trim()
    .min(2, { message: "Country must be at least 2 characters long." })
    .max(100, { message: "Country must not exceed 100 characters." })
    .optional(),

  // Optional deadline field. Many legal cases may not have a strict deadline.
  // Using "z.coerce.date()" allows parsing string inputs into Date objects.
  deadline: z.coerce
    .date({
      invalid_type_error: "Please provide a valid date.",
    })
    .optional()
    .refine((date) => {
      if (!date) return true; // Skip validation if not provided
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date > now;
    }, {
      message: "Deadline must be a future date.",
    }),

  category: caseCategoryEnum,

  stage: caseStageEnum,

  urgency: urgencyEnum.optional(),

  // Indicates whether the case is pro bono (free of charge)
  proBono: z.boolean().optional(),

  // Opposing party details are optional because not all cases involve a defined opposing party
  opposingName: z
    .string()
    .trim()
    .min(2, { message: "Opposing party name must be at least 2 characters long." })
    .max(100, { message: "Opposing party name must not exceed 100 characters." })
    .optional(),

  opposingRelationship: z
    .string()
    .trim()
    .min(3, {
      message: "Opposing party relationship must be at least 3 characters long.",
    })
    .max(100, {
      message: "Opposing party relationship must not exceed 100 characters.",
    })
    .optional(),
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;