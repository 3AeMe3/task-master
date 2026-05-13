"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FieldGroup, Field, FieldError } from "@/components/ui/field";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema, registerSchema } from "@/schema/form-schema";
import Link from "next/link";

type Variant = "register" | "login";

type FormAuthProps = {
  title: string;
  variant?: Variant;
  onSubmitForm?: (data) => void;
};

export default function FormAuth({
  title = "Register",
  variant = "register",
  onSubmitForm,
}: FormAuthProps) {
  const schema = variant === "register" ? registerSchema : loginSchema;

  const defaultValues =
    variant === "register"
      ? {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        };

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Card className=" h-full justify-center w-[40%]  px-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id={`${variant}Form`} onSubmit={handleSubmit(onSubmitForm)}>
          <FieldGroup>
            {variant && variant === "register" ? (
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      className="h-12 border-2 border-purple-800"
                      aria-invalid={fieldState.invalid}
                      placeholder="Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ) : null}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    className="h-12 border-2 border-purple-800"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="password"
                    placeholder="Password"
                    className="h-12 border-2 border-purple-800"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {variant && variant === "register" ? (
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="confirmPassword"
                      className="h-12 border-2 border-purple-800"
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ) : null}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <Field orientation="vertical">
          <Button
            type="submit"
            form={`${variant}Form`}
            className="h-12 text-lg font-semibold"
          >
            {variant && variant === "register" ? "Sign Up" : "Sign In"}
          </Button>
        </Field>
        <p>
          {variant && variant === "register"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            href={`${variant === "register" ? "/login" : "/register"}`}
            className="ml-2 font-semibold"
          >
            {variant && variant === "register" ? "Log In" : "Sign Up"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
