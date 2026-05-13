import { z } from "zod";

const taskStatusSchema = z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]);
const taskPrioritySchema = z.enum(["BAJO", "NORMAL", "URGENTE"]);

const optionalNumberField = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().positive().optional(),
);

const optionalDateField = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.string().trim().optional(),
);

const editableDateField = z.preprocess(
  (value) => (value === null ? "" : value),
  z.string().trim().optional(),
);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, { error: "El titulo es requerido" }),
  description: z.string().trim().min(1, { error: "La descripcion es requerida" }),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema,
  assigneeId: optionalNumberField,
  projectId: z.coerce.number().int().positive(),
  dueDate: optionalDateField,
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, { error: "El titulo es requerido" }).optional(),
    description: z
      .string()
      .trim()
      .min(1, { error: "La descripcion es requerida" })
      .optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    assigneeId: optionalNumberField,
    projectId: z.coerce.number().int().positive().optional(),
    dueDate: editableDateField,
  })
  .refine((value) => Object.keys(value).length > 0, {
    error: "Debe enviar al menos un campo para editar",
  });

export const createSubTaskSchema = z.object({
  title: z.string().trim().min(1, { error: "El titulo es requerido" }),
  description: z.string().trim().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateSubTaskInput = z.infer<typeof createSubTaskSchema>;
