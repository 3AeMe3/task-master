"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { readApiResponse } from "@/lib/http/api-response";
import { fetchWithAuth } from "@/lib/http/fetch-with-auth";

import type { TaskFormValues } from "../forms/task-form";
import type { Task } from "../types/task.types";

export async function getTasks(): Promise<Task[]> {
  const response = await fetchWithAuth("task");

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task[]>(response, "Error fetching tasks");

  return result.data;
}

export async function createTask(data: TaskFormValues) {
  const response = await fetchWithAuth("task", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error creando tarea");

  revalidatePath("/home");
  revalidatePath("/tasks");
  return result.data;
}

export async function completeTask(id: number) {
  const response = await fetchWithAuth(`task/${id}`, {
    method: "PATCH",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(
    response,
    "fallo al momento marcar como completado",
  );

  revalidatePath("/home");
  revalidatePath("/tasks");

  return result.data;
}

export async function deleteTask(id: number) {
  const response = await fetchWithAuth(`task/${id}`, {
    method: "DELETE",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(
    response,
    `Fallo en eliminar el task ${id}`,
  );

  revalidatePath("/home");
  revalidatePath("/tasks");

  return result.data.id;
}

export async function getTaskById(id: number): Promise<Task> {
  const response = await fetchWithAuth(`task/${id}`);

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(
    response,
    "Error al obtener los datos del task",
  );

  return result.data;
}

export async function updateTask(id: number, data: TaskFormValues): Promise<Task> {
  const response = await fetchWithAuth(`edit-task/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(
    response,
    "Error al editar la tarea",
  );

  revalidatePath("/home");
  revalidatePath("/tasks");
  return result.data;
}

type CreateSubTaskInput = {
  title: string;
  description?: string;
};

type CreateTaskCommentInput = {
  content: string;
};

function revalidateTaskViews() {
  revalidatePath("/home");
  revalidatePath("/tasks");
}

export async function createSubTask(taskId: number, data: CreateSubTaskInput): Promise<Task> {
  const response = await fetchWithAuth(`task/${taskId}/subtasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error al crear la subtarea");

  revalidateTaskViews();
  return result.data;
}

export async function toggleSubTask(taskId: number, subTaskId: number): Promise<Task> {
  const response = await fetchWithAuth(`task/${taskId}/subtasks/${subTaskId}`, {
    method: "PATCH",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error al actualizar la subtarea");

  revalidateTaskViews();
  return result.data;
}

export async function deleteSubTask(taskId: number, subTaskId: number): Promise<Task> {
  const response = await fetchWithAuth(`task/${taskId}/subtasks/${subTaskId}`, {
    method: "DELETE",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error al eliminar la subtarea");

  revalidateTaskViews();
  return result.data;
}

export async function createTaskComment(
  taskId: number,
  data: CreateTaskCommentInput,
): Promise<Task> {
  const response = await fetchWithAuth(`task/${taskId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error al crear el comentario");

  revalidateTaskViews();
  return result.data;
}

export async function deleteTaskComment(taskId: number, commentId: number): Promise<Task> {
  const response = await fetchWithAuth(`task/${taskId}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  const result = await readApiResponse<Task>(response, "Error al eliminar el comentario");

  revalidateTaskViews();
  return result.data;
}
