import DashboardBlocks from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <>
      <DashboardBlocks />
      <div className="grid grid-4 lg:grid-cols-3 md:gap-8">
        {/* col-span-2 70% */}
        <InvoiceGraph />

        <h1 className="bg-red-500 col-span-1">this is about 30%</h1>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
