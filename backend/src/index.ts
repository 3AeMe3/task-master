import { prisma } from "./lib/prisma";
import express from "express";
import taskroutes from "./routes/taskRoutes";
import projectRoutes from "./routes/projectRoutes";

import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(taskroutes);
app.use(projectRoutes);
app.use(authRoutes);

app.listen(PORT, async () => {
  const email = "fm792086@gmail.com";
  const name = "3AeMe";

  const existingUser = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email: email,
      name: name,
    },
  });
  await prisma.project.upsert({
    where: { name_userId: { name: "Default", userId: existingUser.id } },
    update: {},
    create: { name: "Default", userId: existingUser.id },
  });
  console.log(`Server is running on http://localhost:${PORT}`);
});
