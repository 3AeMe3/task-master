import { useState } from "react";

import type { TaskFormValues } from "../forms/task-form";
import { updateTask } from "../services/task.server";

export function useUpdateTask() {
  const [error, setError] = useState("");

  const submit = async (taskId: number, data: TaskFormValues) => {
    try {
      setError("");
      const task = await updateTask(taskId, data);

      return { ok: true as const, task };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "no se pudo editar la tarea";

      setError(message);
      return { ok: false as const, message };
    }
  };

  return { submit, error };
}
