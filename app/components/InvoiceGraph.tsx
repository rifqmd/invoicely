import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Graph from "./Graph";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";

async function getInvoiceData(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PAID",
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // last 30 days
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const dateKey = new Date(curr.createdAt).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      });

      acc[dateKey] = (acc[dateKey] || 0) + curr.total;

      return acc;
    },
    {} // <-- initial value for accumulator
  );

  // Transform data to match the graph's expected format
  const transformData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + "," + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformData;
}

export default async function InvoiceGraph() {
  const session = await requireUser();
  const data = await getInvoiceData(session.user?.id as string);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} />
      </CardContent>
    </Card>
  );
}
