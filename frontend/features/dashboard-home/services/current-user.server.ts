"use server";

import { redirect } from "next/navigation";

import { readApiResponse } from "@/lib/http/api-response";
import { fetchWithAuth } from "@/lib/http/fetch-with-auth";

import type { CurrentUser } from "../types/current-user.types";

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await fetchWithAuth("me");

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<CurrentUser>(
    response,
    "Failed to fetch user data",
  );

  return result.data;
}
