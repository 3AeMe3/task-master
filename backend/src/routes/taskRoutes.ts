import { Router } from "express";
import {
  getTasks,
  createTask,
  findTask,
  completeTask,
  deleteTask,
} from "../controller/taskController";

const router = Router();

router.get("/task", getTasks);

router.post("/task", createTask);

router.get("/task/:id", findTask);

router.patch("/task/:id", completeTask);
//
router.delete("/task/:id", deleteTask);

export default router;
