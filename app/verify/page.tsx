import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="min-h-screen flex w-full items-center justify-center">
        <Card className="w-[380px] px-5">
          <CardHeader className="text-center">
            <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
              <Mail className="size-12 text-blue-500" />
            </div>

            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>
            <CardDescription>
              We sent you a verification email. Please check your inbox.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
              <div className="flex items-center">
                <AlertCircle className="size-8 text-yellow-400" />
                <p className="text-sm font-medium text-yellow-700 ml-3">
                  Please check your spam folder if you don&apos;t see the email.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full",
                variant: "outline",
              })}
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to homepage
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
