"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Fallo en eliminar el task" + id);
    }
    revalidatePath("/task");
  } catch (err) {
    console.error(err);
  }

  redirect("/");
};
