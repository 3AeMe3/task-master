"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { readApiResponse } from "@/lib/http/api-response";
import { fetchWithAuth } from "@/lib/http/fetch-with-auth";

import type { Project } from "../types/project.types";

export async function getProjects(): Promise<Project[]> {
  const response = await fetchWithAuth("project");

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Project[]>(
    response,
    "Error al obtener los proyectos",
  );

  return result.data;
}

export async function createProject(formData: FormData) {
  const name = formData.get("name");
  const response = await fetchWithAuth("project", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  await readApiResponse<Project>(response, "Error al crear el proyecto");

  revalidatePath("/projects");
  revalidatePath("/home");
}
