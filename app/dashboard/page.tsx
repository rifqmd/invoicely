import DashboardBlocks from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import RecentInvoices from "../components/RecentInvoices";
import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      <DashboardBlocks />
      <div className="grid grid-4 lg:grid-cols-3 md:gap-8">
        {/* col-span-2 70% */}
        <InvoiceGraph />

        {/* col-span-1 30% */}
        <RecentInvoices />
      </div>
      =
    </>
  );
}
