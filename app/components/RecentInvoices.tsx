import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export default async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((items) => (
          <div key={items.id} className="flex items-center gap-4 last:mb-0">
            <Avatar className="hidden sm:flex size-9">
              <AvatarFallback>{items.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {items.clientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {items.clientEmail}
              </p>
            </div>
            <div className="ml-auto font-medium underline">
              {formatCurrency({
                amount: items.total,
                currency: "IDR",
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
