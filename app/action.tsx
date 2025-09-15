"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
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
    // category: "Invoice",
    template_uuid: "36f76868-51a9-4b35-bbd4-ef5c1926d327",
    template_variables: {
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      date: submission.value.date,
      clientName: submission.value.clientName,
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      fromName: submission.value.fromName,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      dueDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.dueDate)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: process.env.NEXTAPI_URL + `/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.updateMany({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
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
    },
  });

  return redirect("/dashboard/invoices");
}
