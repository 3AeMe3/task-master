import { redirect } from "next/navigation";
import { fetchWithAuth } from "../fetchWithAuth";

export default async function GetTask() {
  const response = await fetchWithAuth("task");
  if (response.status === 401) {
    redirect("/login");
  }
  if (!response.ok) {
    throw new Error("Error fetching tasks");
  }
  return response.json();
}
