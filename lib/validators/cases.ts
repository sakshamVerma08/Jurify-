import { z } from "zod";
import { contactInfoSchema } from "./contact";

//All legal categories for cases
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
],{
  required_error: "Category is required.",
  invalid_type_error: "Please select a valid legal category.",
});

//Current stage of a case.
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


//Opposing party details for a case
export const opposingPartySchema = z.object({
  name: z
    .string({ required_error: "Opposing party name is required." })
    .trim() //to trim the leading and trailing whitespace from the input in case user accidentally adds extra spaces or sends "      ".
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),

  location: z
    .string({ required_error: "Location is required." })
    .trim()
    .min(3, { message: "Location must be at least 3 characters long." })
    .max(100, { message: "Location must not exceed 100 characters." }),

  relationship: z
    .string({ required_error: "Relationship is required." })
    .trim()
    .min(3, {
      message: "Relationship must be at least 3 characters long.",
    })
    .max(100, { message: "Relationship must not exceed 100 characters." }),
});

export const createCaseSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),

  description: z
    .string({ required_error: "Description is required." })
    .trim()
    .min(20, { message: "Description must be at least 20 characters long." })
    .max(2000, { message: "Description must not exceed 2000 characters." }),

// We are using "z.coerce.date" to ensure that the input is treated as a date, even if it's provided as a string.
// Without this, if the user inputs a date in string format, it would fail validation. With "z.coerce.date", it will attempt to parse the string into a date object, allowing for more flexible input while still enforcing that it is a valid date.
  deadline: z.coerce
    .date({
      required_error: "Deadline is required.",
      invalid_type_error: "Please provide a valid date.",
    })
    .refine((date) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return date > now;
    }, {
      message: "Deadline must be a future date.",
    }),

  category: caseCategoryEnum,

  currentStage: caseStageEnum,

  contact: contactInfoSchema,

  opposingParty: opposingPartySchema,
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;