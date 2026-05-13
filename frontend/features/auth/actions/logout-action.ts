"use client";

import { logoutUser } from "../services/auth-client";

export async function logoutAction() {
  await logoutUser();
  window.location.href = "/login";
}
