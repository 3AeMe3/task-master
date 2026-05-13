import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.cookies?.access_token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Token no prporcionado" });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
