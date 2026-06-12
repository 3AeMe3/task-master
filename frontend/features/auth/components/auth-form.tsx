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
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LoginResponse,
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "../schemas/auth-form.schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ApiSuccessResponse } from "@/lib/http/api-response";

type RegisterFormProps = {
  title: string;
  variant?: "register";
  onSubmitForm: (data: RegisterFormValues) => void | Promise<void>;
};

type LoginFormProps = {
  title: string;
  variant: "login";
  onSubmitForm: (
    data: LoginFormValues,
  ) => Promise<ApiSuccessResponse<LoginResponse>>;
};

type FormAuthProps = RegisterFormProps | LoginFormProps;

function RegisterForm({ title, onSubmitForm }: RegisterFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onSubmitForm(data);
      router.push("/login");
    } catch (error) {
      if (isRedirectError(error)) throw error;
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "No se pudo redirigir hacia el login",
      });
    }
  });

  if (isSubmitSuccessful) {
    console.log("se registro correctamente");
  }
  return (
    <Card className=" h-full justify-center w-[40%]  px-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="registerForm" onSubmit={onSubmit}>
          <FieldGroup>
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <Field orientation="vertical">
          {isSubmitSuccessful && (
            <p className="text-green-500 text-sm text-center">
              Se Registro correctamente
            </p>
          )}
          <Button
            type="submit"
            form="registerForm"
            className="h-12 text-lg font-semibold"
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </Button>
        </Field>
        <p>
          Ya tienes una cuenta?
          <Link href="/login" className="ml-2 font-semibold">
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function LoginForm({ title, onSubmitForm }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await onSubmitForm(data);
      await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: result.data.accessToken,
        }),
      });
      router.push("/home");
    } catch (error) {
      if (isRedirectError(error)) throw error;
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Credenciales incorretas. Intenta de nuevo.",
      });
    }
  });

  return (
    <Card className=" h-full justify-center w-[40%]  px-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="loginForm" onSubmit={onSubmit}>
          <FieldGroup>
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
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      placeholder="contraseña"
                      className="h-12 border-2 border-purple-800"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className=" absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      {/* //cuando el usuario ingresa credenciales incorrectos mostrar error */}
      <CardFooter className="flex-col gap-5">
        <Field orientation="vertical">
          {errors.root && (
            <p className="text-red-500 text-sm text-center">
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            form="loginForm"
            className="h-12 text-lg font-semibold"
          >
            {isSubmitting ? "Cargando..." : "Login"}
          </Button>
        </Field>
        <p>
          No tienes una cuenta?
          <Link href="/register" className="ml-2 font-semibold">
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function AuthForm(props: FormAuthProps) {
  if (props.variant === "login") {
    return (
      <LoginForm
        title={props.title}
        variant={props.variant}
        onSubmitForm={props.onSubmitForm}
      />
    );
  }

  return <RegisterForm title={props.title} onSubmitForm={props.onSubmitForm} />;
}
