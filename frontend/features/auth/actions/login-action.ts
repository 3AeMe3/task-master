"use client";

import type { LoginFormValues } from "../schemas/auth-form.schema";
import { loginUser } from "../services/auth-client";

export async function loginAction(data: LoginFormValues) {
  return loginUser(data);
}
