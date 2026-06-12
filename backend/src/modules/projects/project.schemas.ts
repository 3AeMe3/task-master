import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, { error: "El nombre del proyecto es requerido" }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
