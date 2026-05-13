"use server";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
export const getTaskData = async (id: string) => {
  try {
    const converId = Number(id);
    const response = await fetchWithAuth(`task/${converId}`);
    if (response.status === 401) {
      redirect("/login");
    }
    if (!response.ok) {
      throw new Error("Error al obtener los datos del task");
    }
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
export async function editTask(id: number) {}
