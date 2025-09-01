"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
// import { emailClient } from "./utils/mailtrap";

export async function onboardUser(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  console.log(data);

  return redirect("/dashboard");
}

export async function createInvoice(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceName: submission.value.invoiceName,
      note: submission.value.note,
      status: submission.value.status,
      total: submission.value.total,
      userId: session.user?.id,
    },
  });

  console.log(data);

  const sender = {
    // email: data.fromEmail,
    // name: data.fromName,
    email: "hello@demomailtrap.co",
    name: "Rfq Dev",
  };

  emailClient.send({
    from: sender,
    to: [
      {
        email: submission.value.clientEmail,
        // email: "rifqidev77@gmail.com",
        name: submission.value.clientName,
      },
    ],
    subject: `New Invoice ${data.invoiceNumber} from ${data.fromName} for you.`,
    text: `Hello ${data.clientName},\n\nYou have a new invoice (${data.invoiceNumber}) from ${data.fromName}. The total amount is ${data.total} ${data.currency}.\n\nThank you.`,
    category: "Invoice",
  });

  return redirect("/dashboard/invoices");
}
