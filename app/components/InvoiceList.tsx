import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceAction from "./InvoiceAction";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import { Badge } from "@/components/ui/badge";

async function getInvoices(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function InvoiceList() {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>#{invoice.id}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>
                {formatCurrency({
                  amount: invoice.total,
                  // currency: invoice.invoiceNumber.startsWith("IDR") ? "IDR" : "USD",
                  currency: invoice.currency as any,
                })}
              </TableCell>
              <TableCell>
                <Badge>{invoice.status}</Badge>
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(invoice.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <InvoiceAction />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
