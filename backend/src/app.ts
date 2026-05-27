import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes";
import meRoutes from "./modules/me/me.routes";
import projectRoutes from "./modules/projects/project.routes";
import taskroutes from "./modules/tasks/task.routes";
import { errorMiddleware } from "./shared/middleware/error-middleware";

// Load env for local dev; Vercel will provide env vars in production
dotenv.config({ path: ".env.local" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //siempre colocarlo antes de cors no despues

// CORS: allow FRONTEND_URL (set in env) or default localhost for dev
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(",");
const corsOptions = {
  origin: (origin: string | undefined, cb: any) => {
    // allow server-to-server or same-origin requests (no origin)
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) return cb(null, true);

    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(meRoutes);
app.use(taskroutes);
app.use(projectRoutes);
app.use(authRoutes);
app.use(errorMiddleware);

export default app;
