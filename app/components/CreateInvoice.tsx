import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

export default function CreateInvoice() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6 ">
        <div className="flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Draft</Badge>
            <Input placeholder="Invoice title" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label>Invoice No.</Label>
            <div className="flex">
              <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                #
              </span>
              <Input className="rounded-l-none" placeholder="" />
            </div>
          </div>
        </div>

        <div>
          <Label>Currency</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
