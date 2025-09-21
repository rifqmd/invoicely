import { buttonVariants } from "@/components/ui/button";
import { Ban, CirclePlus } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  title: string;
  description: string;
  buttonText?: string | null;
  href?: string | null;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: iAppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border-2  border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="text-primary size-10 " />
      </div>
      <h1 className="mt-6 text-xl font-semibold">{title}</h1>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>

      {href ? (
        <Link href={href} className={buttonVariants({ size: "sm" })}>
          <CirclePlus /> {buttonText}
        </Link>
      ) : null}
    </div>
  );
}
