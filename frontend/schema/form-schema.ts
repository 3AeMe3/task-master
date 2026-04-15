import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "El titulo por lo menos tiene que tener una letra"),
  description: z
    .string()
    .min(1, "La description debe de tener por lo menos una letra"),
  createdAt: z.iso.date({ error: "La fecha es obligatoria" }),
  status: z.enum(["PENDIENTE", "COMPLETADO", "VENCIDO"]),
  priority: z.enum(["BAJO", "NORMAL", "URGENTE"]),
  projectId: z
    .number()
    .int()
    .positive({ error: "El proyecto debe de ser un ID válido" }),
});
