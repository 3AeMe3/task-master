import * as z from "zod";
import { taskSchema } from "@/schema/form-schema";
export type TaskFormValues = z.infer<typeof taskSchema>;

export const defaultTaskValues: TaskFormValues = {
  title: "",
  description: "",
  status: "PENDIENTE",
  priority: "NORMAL",
  projectId: undefined,
  dueDate: "",
};
