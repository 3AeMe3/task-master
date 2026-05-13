import { cookies } from "next/headers";
export async function fetchWithAuth(url: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return await fetch(`http://localhost:4000/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
    },
  });
}
