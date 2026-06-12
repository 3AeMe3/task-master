import { useState } from "react";

import type { TaskFormValues } from "../forms/task-form";
import { createTask } from "../services/task.server";

export function useCreateTask() {
  const [error, setError] = useState("");

  const submit = async (data: TaskFormValues) => {
    try {
      setError("");
      await createTask(data);
      return { ok: true as const };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "no se pudo crear la tarea";

      setError(message);
      return { ok: false as const, message };
    }
  };

  return { submit, error, clearError: () => setError("") };
}
