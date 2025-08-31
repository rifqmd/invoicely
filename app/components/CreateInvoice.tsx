"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButtons";

export default function CreateInvoice() {
  const [selectDate, setSelectDate] = useState(new Date());

  return (
    <Card className="w-full max-w-6xl mx-auto mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Draft</Badge>
            <Input placeholder="Invoice title" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <Label className="mb-2">Invoice No.</Label>
            <div className="flex">
              <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                #
              </span>
              <Input className="rounded-l-none" placeholder="" />
            </div>
          </div>

          <div>
            <Label className="mb-2">Currency</Label>
            <Select defaultValue="IDR">
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="IDR">Indonesian Rupiah -- IDR</SelectItem>
                <SelectItem value="USD">United States Dollar -- USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label className="mb-2">From</Label>
            <div className="space-y-2">
              <Input placeholder="Your name" />
              <Input placeholder="Your email" />
              <Input placeholder="Your address" />
            </div>
          </div>

          <div>
            <Label className="mb-2">To</Label>
            <div className="space-y-2">
              <Input placeholder="Client name" />
              <Input placeholder="Client email" />
              <Input placeholder="Client address" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="mb-2">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectDate)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectDate}
                    onSelect={(date) => setSelectDate(date || new Date())}
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label className="mb-2">Invoice Due</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select due date" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="1">
                  Due on{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(selectDate)}
                </SelectItem> */}
                <SelectItem value="0">Due on Receipt</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
            <p className="col-span-6">Description</p>
            <p className="col-span-2">Quality</p>
            <p className="col-span-2">Rate</p>
            <p className="col-span-2">Amount</p>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
            <div className="col-span-6">
              <Textarea placeholder="items name & description" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <div className="w-1/3">
            <div className="flex justify-between mb-2 py-2">
              <span>Subtotal</span>
              <span>Rp. 5000</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span>Total: </span>
              <span className="font-medium underline">Rp. 5000</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="mb-2">Note</Label>
          <Textarea placeholder="Add your note here..." />
        </div>

        <div className="flex items-center justify-end mt-6">
          <div>
            <SubmitButton text="Send Invoice to Client" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
