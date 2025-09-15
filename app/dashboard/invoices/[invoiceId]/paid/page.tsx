import { MarkAsPaidAction } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButtons";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  await Authorize(invoiceId, session.user?.id as string);

  return (
    <div className="container justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Invoice marked as paid!</CardTitle>
          <CardDescription>
            Your invoice has been successfully marked as paid.
          </CardDescription>
          <CardFooter className="flex items-center justify-between">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard/invoices"
            >
              Cancel
            </Link>
            <form
              action={async () => {
                "use server";

                await MarkAsPaidAction(invoiceId);
              }}
            >
              <SubmitButton text="Mark as Paid" />
            </form>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
