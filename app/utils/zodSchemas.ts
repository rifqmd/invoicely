import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});
