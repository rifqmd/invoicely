import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceAction from "./InvoiceAction";

export default function InvoiceList() {
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
          <TableRow>
            <TableCell>01</TableCell>
            <TableCell>John</TableCell>
            <TableCell>Rp. 2000</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>2023-01-01</TableCell>
            <TableCell className="text-right">
              <InvoiceAction />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
