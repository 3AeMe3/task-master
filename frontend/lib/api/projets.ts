"use server";
import { fetchWithAuth } from "../fetchWithAuth";
import { redirect } from "next/navigation";

export async function getProjects() {
  const response = await fetchWithAuth("project");
  if (response.status === 401) {
    redirect("/login");
  }
  if (!response.ok) {
    throw new Error("Error al obtener los proyectos");
  }
  return response.json();
}

export async function postProject(formData: FormData) {
  const name = formData.get("name");
  const response = await fetchWithAuth("project", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  if (response.status === 401) {
    redirect("/login");
  }
  if (!response.ok) {
    throw new Error("Error al crear el proyecto");
  }
}
