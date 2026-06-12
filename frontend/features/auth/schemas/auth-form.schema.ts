import * as z from "zod";

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

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginResponse = { accessToken: string };
