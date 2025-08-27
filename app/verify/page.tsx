import { Card, CardHeader } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Verify() {
  return (
    <div className="min-h-screen flex w-full items-center justify-center">
      <Card className="w-[380px] px-5">
        <CardHeader>
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
