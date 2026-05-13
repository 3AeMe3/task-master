import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schema/authSchema";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      result.error;
      return res
        .status(400)
        .json({ message: "Datos Invalidos ", error: result.error });
    }

    const { email, password, name } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya exist" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const resultTx = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword },
      });
      const project = await tx.project.create({
        data: { name: "default", userId: user.id },
      });

      return { user, project };
    });
    const { password: _, ...safeUser } = resultTx.user;

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente", user: safeUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error interno del servido" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Error en recibir los datos " });
    }
    const { email, password } = result.data;

    const existUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      return res.status(404).json({ message: "No se encontro al usuario" });
    }

    console.log("password enviada", password);
    console.log("password almacenada", existUser.password);
    const isValid = await bcrypt.compare(password, existUser.password);

    if (!isValid) {
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Credenciales Incorrectos",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    }

    console.log(process.env.JWT_SECRET, "este es el JWT_SECRET en loginUser");
    const accessToken = jwt.sign(
      { userId: existUser.id, email: existUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.json({ message: "Logged In " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servido" });
  }
};

export const logOutUser = (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.sendStatus(200).json({ message: "Logged out" });
};
