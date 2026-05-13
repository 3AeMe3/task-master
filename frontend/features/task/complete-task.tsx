"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const completeTask = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await fetch(`http://localhost:4000/task/${id}`, {
      method: "PATCH",
      headers: { Cookie: `access_token=${token}` },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("fallo al momento marcar como completado ");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  revalidatePath("/home");
  redirect("/home");
};
