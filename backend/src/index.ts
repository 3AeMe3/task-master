import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes";
import meRoutes from "./modules/me/me.routes";
import projectRoutes from "./modules/projects/project.routes";
import taskroutes from "./modules/tasks/task.routes";
import { errorMiddleware } from "./shared/middleware/error-middleware";

dotenv.config({ path: ".env.local" });
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //siempre colocarlo antes de cors no despues
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(meRoutes);
app.use(taskroutes);
app.use(projectRoutes);
app.use(authRoutes);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
