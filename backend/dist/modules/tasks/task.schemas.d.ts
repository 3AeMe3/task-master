import { z } from "zod";
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        PENDIENTE: "PENDIENTE";
        COMPLETADO: "COMPLETADO";
        VENCIDO: "VENCIDO";
    }>>;
    priority: z.ZodEnum<{
        BAJO: "BAJO";
        NORMAL: "NORMAL";
        URGENTE: "URGENTE";
    }>;
    assigneeId: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    projectId: z.ZodCoercedNumber<unknown>;
    dueDate: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDIENTE: "PENDIENTE";
        COMPLETADO: "COMPLETADO";
        VENCIDO: "VENCIDO";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        BAJO: "BAJO";
        NORMAL: "NORMAL";
        URGENTE: "URGENTE";
    }>>;
    assigneeId: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    projectId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    dueDate: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const createSubTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createTaskCommentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export declare const createTaskTagSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateSubTaskInput = z.infer<typeof createSubTaskSchema>;
export type CreateTaskCommentInput = z.infer<typeof createTaskCommentSchema>;
export type CreateTaskTagInput = z.infer<typeof createTaskTagSchema>;
//# sourceMappingURL=task.schemas.d.ts.map