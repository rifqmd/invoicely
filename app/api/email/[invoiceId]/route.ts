import { request } from "./../../../../node_modules/effect/src/Effect";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;
    const invoiceDate = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceDate) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Rfq Dev",
    };

    emailClient.send({
      from: sender,
      to: [{ email: invoiceDate.clientEmail, name: invoiceDate.clientName }],
      subject: `Reminder: Invoice ${invoiceDate.invoiceNumber} is due soon`,
      text: `Dear ${invoiceDate.clientName},
      This is a friendly reminder that your invoice ${
        invoiceDate.invoiceNumber
      } is due on ${new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(
        new Date(invoiceDate.dueDate)
      )}. Please make sure to process it by the due date to avoid any late fees.

      Thank you!
    `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
