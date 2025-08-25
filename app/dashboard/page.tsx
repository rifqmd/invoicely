import { redirect } from "next/navigation";
import { auth } from "../utils/auth";

export default async function DashboardRoute() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <h1>hello this dashboard route</h1>
    </div>
  );
}
