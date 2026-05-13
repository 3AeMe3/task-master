import * as z from "zod";

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]).optional(),
  priority: z.enum(["BAJO", "NORMAL", "URGENTE"]).optional(),
  assigneeId: z.number().optional(),
  projectId: z.number().optional(),
  dueDate: z.string(),
});

export const registerSchema = z
  .object({
    name: z.string().trim(),
    email: z.email({ error: "Ingresa un email valido" }),
    password: z
      .string()
      .min(6, { error: "La contraseña es muy corta" })
      .max(20, { error: "La contraseña es muy larga" }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    error: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ error: "Ingresa un email valido" }),
  password: z
    .string()
    .min(6, { error: "La contraseña es muy corta" })
    .max(20, { error: "La contraseña es muy larga" }),
});
