import { Router } from "express";
import {
  getTasks,
  createTask,
  findTask,
  completeTask,
  deleteTask,
  editTask,
} from "../controller/taskController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/task", verifyToken, getTasks);

router.post("/task", verifyToken, createTask);

router.get("/task/:id", verifyToken, findTask);

router.patch("/task/:id", verifyToken, completeTask);
//
router.delete("/task/:id", verifyToken, deleteTask);

router.patch("/edit-task/:id", verifyToken, editTask);

export default router;
