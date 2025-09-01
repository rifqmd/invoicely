"use client";

import { useActionState, useState } from "react";
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
import { CalendarIcon, InfoIcon } from "lucide-react";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "./SubmitButtons";
import { createInvoice } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

export default function CreateInvoice({
  firstName,
  lastName,
  address,
  email,
}: iAppProps) {
  const [lastResult, action] = useActionState(createInvoice, undefined);
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

  const [selectDate, setSelectDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useState("IDR");
  const [quantity, setQuantity] = useState("");
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
                defaultValue={field.invoiceName.initialValue}
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
                  defaultValue={field.invoiceNumber.initialValue}
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
                  defaultValue={`${firstName} ${lastName}`}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.fromName.errors}
                </p>
                <Input
                  name={field.fromEmail.name}
                  key={field.fromEmail.key}
                  placeholder="Your email"
                  defaultValue={email}
                />
                <p className="text-red-500 text-sm select-none">
                  {field.fromEmail.errors}
                </p>
                <Input
                  name={field.fromAddress.name}
                  key={field.fromAddress.key}
                  placeholder="Your address"
                  defaultValue={address}
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
                  defaultValue={field.clientName.initialValue}
                  placeholder="Client name"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.clientName.errors}
                </p>
                <Input
                  name={field.clientEmail.name}
                  key={field.clientEmail.key}
                  defaultValue={field.clientEmail.initialValue}
                  placeholder="Client email"
                />
                <p className="text-red-500 text-sm select-none">
                  {field.clientEmail.errors}
                </p>
                <Input
                  name={field.clientAddress.name}
                  key={field.clientAddress.key}
                  defaultValue={field.clientAddress.initialValue}
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
                defaultValue={field.dueDate.initialValue}
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
                  defaultValue={field.invoiceItemDescription.initialValue}
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
              defaultValue={field.note.initialValue}
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
