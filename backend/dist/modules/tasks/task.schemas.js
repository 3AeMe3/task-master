import { z } from "zod";
const taskStatusSchema = z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]);
const taskPrioritySchema = z.enum(["BAJO", "NORMAL", "URGENTE"]);
const optionalNumberField = z.preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().int().positive().optional());
const optionalDateField = z.preprocess((value) => (value === "" || value === null ? undefined : value), z.string().trim().optional());
const editableDateField = z.preprocess((value) => (value === null ? "" : value), z.string().trim().optional());
export const createTaskSchema = z.object({
    title: z.string().trim().min(1, { error: "El titulo es requerido" }),
    description: z.string().trim().min(1, { error: "La descripcion es requerida" }),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema,
    assigneeId: optionalNumberField,
    projectId: z.coerce.number().int().positive(),
    dueDate: optionalDateField,
    tags: z.array(z.string().trim().min(1)).optional(),
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
export const createTaskCommentSchema = z.object({
    content: z.string().trim().min(1, { error: "El comentario es requerido" }),
});
export const createTaskTagSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: "La etiqueta es requerida" })
        .max(30, { error: "La etiqueta es demasiado larga" }),
});
//# sourceMappingURL=task.schemas.js.map