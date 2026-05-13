import * as z from "zod";

export const taskSchema = z
  .object({
    title: z.string().trim().min(1, { error: "Escribe un titulo para la tarea" }),
    description: z
      .string()
      .trim()
      .min(1, { error: "Agrega una descripcion breve" }),
    status: z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]).optional(),
    priority: z.enum(["BAJO", "NORMAL", "URGENTE"]).optional(),
    assigneeId: z.number().optional(),
    projectId: z.number().int().positive().optional(),
    dueDate: z.string().trim(),
  })
  .refine((values) => values.projectId !== undefined, {
    error: "Selecciona un proyecto",
    path: ["projectId"],
  });
