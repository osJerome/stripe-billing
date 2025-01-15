import * as z from "zod";

export const subscriptionSchema = z.object({
  // email: z.string().email("Invalid email address").min(1, "Email is required"),
  tier: z.string().min(1, "Please select a subscription tier"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .min(1, "Card number is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)")
    .refine((value) => {
      const [month, year] = value.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    }, "Expiry date cannot be in the past"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;
