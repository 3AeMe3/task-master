import { z } from "zod";
export const loginSchema = z.object({
    email: z.email({ error: "Email no valido" }),
    password: z
        .string()
        .min(6, { error: "La contraseña debe de tener minimo 6 letras" }),
});
export const registerSchema = loginSchema.extend({
    name: z.string().trim().min(1, { error: "El nombre es requerido" }),
});
//# sourceMappingURL=auth.schemas.js.map