import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});

export const invoiceSchema = z.object({
  invoiceName: z
    .string()
    .min(2, "Invoice name must be at least 2 characters long"),
  total: z.number().min(1, "Total must be at least 1"),
  status: z
    .enum(["DRAFT", "SENT", "PAID", "CANCELLED", "PENDING"])
    .default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(0, "Due date is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "From address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().min(1, "Client address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity min 1"),
  invoiceItemRate: z.number().min(1, "Rate min 1"),
});
