"use server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/http/api-config";
import { readApiResponse } from "@/lib/http/api-response";

import type { Project } from "../types/project.types";

export async function getProjectsClient(): Promise<Project[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const response = await fetch(`${API_BASE_URL}/project`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await readApiResponse<Project[]>(
    response,
    "Error al obtener los proyectos",
  );

  return result.data;
}
