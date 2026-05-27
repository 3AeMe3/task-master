"use client";

import { redirect } from "next/navigation";

import type { LoginFormValues } from "../schemas/auth-form.schema";
import { loginUser } from "../services/auth-client";

export async function loginAction(data: LoginFormValues) {
  await loginUser(data);

  redirect("/home");
}
