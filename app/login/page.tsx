import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import { redirect } from "next/navigation";
import SubmitButton from "../components/SubmitButtons";
import Link from "next/link";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <SubmitButton text="Login" />

              <div className="flex items-center my-1">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
                onClick={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                Login with Google
              </button>

              <p className="px-1 text-center text-sm text-gray-600">
                Don{"'"}t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
