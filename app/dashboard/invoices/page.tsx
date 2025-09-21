import InvoiceList from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function InvoiceRoute() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold ">Invoices</CardTitle>
              <CardDescription>Manage your invoices</CardDescription>
            </div>

            <Link
              href={"/dashboard/invoices/create"}
              className={buttonVariants()}
            >
              <PlusIcon /> Create Invoice
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center">
            <Suspense fallback={<LoaderIcon className="animate-spin" />}>
              <InvoiceList />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
