"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButtons";
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { invoiceSchema } from "../utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { editInvoice } from "../action";
import type { Prisma } from "@/lib/generated/prisma";

interface iAppProps {
  data: Prisma.InvoiceGetPayload<object>;
}

export function EditInvoice({ data }: iAppProps) {
  const [lastResult, action] = useActionState(editInvoice, undefined);
  const [form, field] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [selectDate, setSelectDate] = useState(data.date);
  const [rate, setRate] = useState(data.invoiceItemRate.toString());
  const [currency, setCurrency] = useState(data.currency);
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
  // kurs currency
  const EXCHANGE_RATE = 0;
  const calculatedTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  return (
    <Card className="w-full max-w-6xl mx-auto mb-6">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={field.date.name}
            value={selectDate.toISOString()}
          />

          <input
            type="hidden"
            name={field.total.name}
            value={calculatedTotal}
          />

          <div className="flex flex-col gap-1 w-fit">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={field.invoiceName.name}
                key={field.invoiceName.key}
                defaultValue={data.invoiceName}
                placeholder="Invoice title"
              />
            </div>
            <p className="text-red-500 text-sm select-none">
              {field.invoiceName.errors}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <Label className="mb-2">Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  name={field.invoiceNumber.name}
                  key={field.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  className="rounded-l-none"
                  placeholder="0"
                />
              </div>
              <p className="text-red-500 text-sm select-none">
                {field.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <div className="flex gap-2">
                <Label className="mb-2">Currency</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <InfoIcon className="size-4 text-muted-foreground cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <p>
                      1 USD ={" "}
                      {formatCurrency({
                        amount: EXCHANGE_RATE,
                        currency: "IDR",
                      })}
                    </p>
                    <p>
                      1 IDR ={" "}
                      {formatCurrency({
                        amount: 1 / EXCHANGE_RATE,
                        currency: "USD",
                      })}
                    </p>
                    {currency === "IDR" ? (
                      <p>
                        Total in USD:{" "}
                        {formatCurrency({
                          amount: calculatedTotal / EXCHANGE_RATE,
                          currency: "USD",
                        })}
                      </p>
                    ) : (
                      <p>
                        Total in IDR:{" "}
                        {formatCurrency({
                          amount: calculatedTotal * EXCHANGE_RATE,
                          currency: "IDR",
                        })}
                      </p>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value)}
                name={field.currency.name}
                key={field.currency.key}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="IDR">Indonesian Rupiah -- IDR</SelectItem>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-red-500 text-sm select-none">
              {field.currency.errors}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label className="mb-2">From</Label>
              <div className="space-y-2">
                <Input
                  name={field.fromName.name}
                  key={field.fromName.key}
                  placeholder="Your name"
                  defaultValue={data.fromName}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.fromName.errors}
                </p>
                <Input
                  name={field.fromEmail.name}
                  key={field.fromEmail.key}
                  placeholder="Your email"
                  defaultValue={data.fromEmail}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.fromEmail.errors}
                </p>
                <Input
                  name={field.fromAddress.name}
                  key={field.fromAddress.key}
                  placeholder="Your address"
                  defaultValue={data.fromAddress}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.fromAddress.errors}
                </p>
              </div>
            </div>

            <div>
              <Label className="mb-2">To</Label>
              <div className="space-y-2">
                <Input
                  name={field.clientName.name}
                  key={field.clientName.key}
                  defaultValue={data.clientName}
                  placeholder="Client name"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.clientName.errors}
                </p>
                <Input
                  name={field.clientEmail.name}
                  key={field.clientEmail.key}
                  defaultValue={data.clientEmail}
                  placeholder="Client email"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.clientEmail.errors}
                </p>
                <Input
                  name={field.clientAddress.name}
                  key={field.clientAddress.key}
                  defaultValue={data.clientAddress}
                  placeholder="Client address"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.clientAddress.errors}
                </p>
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
                <p className="text-red-500 text-sm select-none">
                  {field.date.errors}
                </p>
              </div>
            </div>

            <div>
              <Label className="mb-2">Invoice Due</Label>
              <Select
                name={field.dueDate.name}
                key={field.dueDate.key}
                defaultValue={data.dueDate.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm select-none">
                {field.dueDate.errors}
              </p>
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
                <Textarea
                  name={field.invoiceItemDescription.name}
                  key={field.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription}
                  placeholder="items name & description"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={field.invoiceItemQuantity.name}
                  key={field.invoiceItemQuantity.key}
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={field.invoiceItemRate.name}
                  key={field.invoiceItemRate.key}
                  type="number"
                  placeholder="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency({
                    amount: calculatedTotal,
                    currency: currency as "IDR" | "USD",
                  })}
                  type="text"
                  placeholder="0"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-1/3">
              <div className="flex justify-between mb-2 py-2">
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: calculatedTotal,
                    currency: currency as "IDR" | "USD",
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total ({currency})</span>
                <span className="font-medium underline">
                  {formatCurrency({
                    amount: calculatedTotal,
                    currency: currency as "IDR" | "USD",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2">Note</Label>
            <Textarea
              name={field.note.name}
              key={field.note.key}
              defaultValue={data.note ?? undefined}
              placeholder="Add your note here..."
            />
            <p className="text-red-500 text-sm select-none">
              {field.note.errors}
            </p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
