"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { taskSchema } from "@/schema/form-schema";
import { cookies } from "next/headers";

export async function createTask(data: z.infer<typeof taskSchema>) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch("http://localhost:4000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error creando tarea");
    }

    const result = await response.json();

    revalidatePath("/task");

    return result;
  } catch (err) {
    console.log(err);
    return err instanceof Error ? err.message : "Error del server";
  }
}
