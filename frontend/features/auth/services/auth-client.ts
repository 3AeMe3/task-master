import { API_BASE_URL } from "@/lib/http/api-config";
import { readApiResponse } from "@/lib/http/api-response";

import type {
  LoginFormValues,
  RegisterFormValues,
  LoginResponse,
} from "../schemas/auth-form.schema";

async function authRequest<T>(path: string, payload?: unknown) {
  const response = await fetch(`${API_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...(payload !== undefined && { body: JSON.stringify(payload) }),
  });
  return readApiResponse<T>(response, "Error de autenticación");
}

export async function loginUser(data: LoginFormValues) {
  return authRequest<LoginResponse>("login", data);
}

export async function registerUser(data: RegisterFormValues) {
  await authRequest("register", data);
}

export async function logoutUser() {
  await authRequest("logOut");
}
