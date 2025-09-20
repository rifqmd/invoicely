"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/SubmitButtons";
import { onboardUser } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";
import { useActionState } from "react";

export default function Onboarding() {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, field] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="h-screen flex items-center justify-center">
        <Card className="w-full max-w-md flex-none mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              You are already onboarded!
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
            <CardContent>
              <form
                className="grid gap-4 mt-5"
                action={action}
                id={form.id}
                onSubmit={form.onSubmit}
                noValidate
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>First Name</Label>
                    <Input
                      name={field.firstName.name}
                      key={field.firstName.key}
                      defaultValue={field.firstName.initialValue}
                      placeholder="Enter your first name"
                    />
                    <p className="text-sm text-red-500 select-none">
                      {field.firstName.errors}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label>Last Name</Label>
                    <Input
                      name={field.lastName.name}
                      key={field.lastName.key}
                      defaultValue={field.lastName.initialValue}
                      placeholder="Enter your last name"
                    />
                    <p className="text-sm text-red-500 select-none">
                      {field.lastName.errors}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 mt-2">
                  <Label>Address</Label>
                  <Input
                    name={field.address.name}
                    key={field.address.key}
                    defaultValue={field.address.initialValue}
                    placeholder="Enter your address"
                  />
                  <p className="text-sm text-red-500 select-none">
                    {field.address.errors}
                  </p>
                </div>

                <SubmitButton text="Finish onboarding" />
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
