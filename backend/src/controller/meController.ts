import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const meGet = async (req: Request, res: Response) => {
  try {
    const userId = Number((req as any).user.userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
    return res.json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error al obtener los datos del usuario" });
  }
};
