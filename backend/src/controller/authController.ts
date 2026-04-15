import { Request, Response } from "express";
import * as z from "zod";

const registerSchema = z.object({
  email: z.email({ error: "Email no valido" }),
  password: z
    .string()
    .min(6, { error: "La contraseña debe de tener minimo 6 letras" }),
});

export const registerUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = registerSchema.safeParse({ email, password });

  if (!result.success) {
    result.error;
    return res.status(400).json({ message: "fallo ", error: result.error });
  } else {
    res.status(200).json({ message: "todo correcto", data: result.data });
  }
};
