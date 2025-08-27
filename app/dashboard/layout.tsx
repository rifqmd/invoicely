import { ReactNode } from "react";
import { requireUser } from "../utils/hooks";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();
  return (
    <>
      {/* navbar */}
      <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[280px-1fr]">
        {/* sidebar */}
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px]">
              <Link href="/" className="flex items-center">
                <Image src={Logo} alt="Logo" className="size-15" />
                <p className="text-2xl font-bold">
                  Invoice<span className="text-[#ffd600]">ly</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
