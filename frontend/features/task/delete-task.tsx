"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteTask = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("access_token")?.value;
    const response = await fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
      headers: { Cookie: `access_token=${token}` },
    });

    if (!response.ok) {
      throw new Error("Fallo en eliminar el task" + id);
    }
    revalidatePath("/task");
  } catch (err) {
    console.error(err);
  }
};
