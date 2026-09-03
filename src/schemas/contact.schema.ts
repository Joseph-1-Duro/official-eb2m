import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name"),
  lastName: z.string().trim().min(1, "Please enter your last name"),
  email: z.email({ error: "Please enter a valid email address" }),
  phone: z.string().trim().min(1, "Please enter your phone number"),
  message: z
    .string()
    .trim()
    .min(5, "Please enter a message of at least 5 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;