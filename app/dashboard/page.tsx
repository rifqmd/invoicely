import SubmitButton from "../components/SubmitButtons";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
  const session = await requireUser();

  return (
    <div>
      <h1>hello this dashboard route</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <SubmitButton />
      </form>
    </div>
  );
}
