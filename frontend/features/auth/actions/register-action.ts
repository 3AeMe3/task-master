"use client";

import type { RegisterFormValues } from "../schemas/auth-form.schema";
import { registerUser } from "../services/auth-client";

export async function registerAction(data: RegisterFormValues) {
  await registerUser(data);
}
