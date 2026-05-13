import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import taskroutes from "./routes/taskRoutes";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";
import meRoutes from "./routes/meRoutes";

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

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
