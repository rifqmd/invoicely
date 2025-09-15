import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";
import Rotary_GIF from "@/public/led_rotary.gif";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/app/components/SubmitButtons";
import { DeleteInvoice } from "@/app/action";

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

export default async function DeleteInvoiceRoute({
  params,
}: {
  params: Params;
}) {
  const session = await requireUser();

  const { invoiceId } = await params;
  await Authorize(invoiceId, session.user?.id as string);
  return (
    <div className="container flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={Rotary_GIF} alt="Warning Gif" className="rounded-xl" />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/dashboard/invoices"
          >
            Cancel{" "}
          </Link>
          <form
            action={async () => {
              "use server";

              await DeleteInvoice(invoiceId);
            }}
          >
            <SubmitButton text="Delete Invoice" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
