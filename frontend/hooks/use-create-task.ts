import { useState } from "react";
import { createTask } from "../features/task/handle-create";
import { TaskFormValues } from "@/lib/forms/task-form";

export function useCreateTask() {
  const [error, setError] = useState("");

  const submit = async (data: TaskFormValues) => {
    try {
      setError("");
      console.log(data, typeof data);
      const result = await createTask(data);
      console.log(result);

      if (!result.success) {
        throw new Error("Error al crear la tarea");
      }
      return true;
    } catch {
      setError("no se pudo crear la tarea");
      return false;
    }
  };
  return { submit, error };
}
