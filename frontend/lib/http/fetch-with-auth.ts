import { cookies } from "next/headers";
import { API_BASE_URL } from "./api-config";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}/${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}
