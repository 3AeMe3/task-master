import { Router } from "express";

import { verifyToken } from "../../shared/middleware/auth-middleware";
import {
  completeTaskController,
  createSubTaskController,
  createTaskController,
  deleteSubTaskController,
  deleteTaskController,
  editTaskController,
  findTaskController,
  getTasksController,
  toggleSubTaskController,
} from "./task.controller";

const taskRouter = Router();

taskRouter.get("/task", verifyToken, getTasksController);
taskRouter.post("/task", verifyToken, createTaskController);
taskRouter.get("/task/:id", verifyToken, findTaskController);
taskRouter.patch("/task/:id", verifyToken, completeTaskController);
taskRouter.delete("/task/:id", verifyToken, deleteTaskController);
taskRouter.patch("/edit-task/:id", verifyToken, editTaskController);
taskRouter.post("/task/:id/subtasks", verifyToken, createSubTaskController);
taskRouter.patch("/task/:id/subtasks/:subTaskId", verifyToken, toggleSubTaskController);
taskRouter.delete("/task/:id/subtasks/:subTaskId", verifyToken, deleteSubTaskController);

export default taskRouter;
