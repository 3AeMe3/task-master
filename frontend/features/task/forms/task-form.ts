import * as z from "zod";

import { taskSchema } from "../schemas/task-form.schema";
import type { Task } from "../types/task.types";

export type TaskFormValues = z.infer<typeof taskSchema>;

export const defaultTaskValues: TaskFormValues = {
  title: "",
  description: "",
  status: "PENDIENTE",
  priority: "NORMAL",
  projectId: undefined,
  dueDate: "",
};

export function getTaskFormValues(task?: Partial<Task>): TaskFormValues {
  return {
    ...defaultTaskValues,
    title: task?.title ?? defaultTaskValues.title,
    description: task?.description ?? defaultTaskValues.description,
    status: task?.status ?? defaultTaskValues.status,
    priority: task?.priority ?? defaultTaskValues.priority,
    projectId: task?.projectId ?? task?.project?.id ?? defaultTaskValues.projectId,
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : defaultTaskValues.dueDate,
  };
}
