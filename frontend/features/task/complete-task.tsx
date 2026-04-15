"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const completeTask = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:4000/task/${id}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("fallo al momento marcar como completado ");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  revalidatePath("/");
  redirect("/");
};
