import { Router } from "express";
import { verifyToken } from "../../shared/middleware/auth-middleware.js";
import { addTaskTagController, completeTaskController, createTaskCommentController, createSubTaskController, createTaskController, deleteTaskCommentController, deleteSubTaskController, deleteTaskController, editTaskController, findTaskController, getTasksController, removeTaskTagController, toggleSubTaskController, } from "./task.controller.js";
const taskRouter = Router();
taskRouter.get("/task", verifyToken, getTasksController);
taskRouter.post("/task", verifyToken, createTaskController);
taskRouter.get("/task/:id", verifyToken, findTaskController);
taskRouter.patch("/task/:id", verifyToken, completeTaskController);
taskRouter.delete("/task/:id", verifyToken, deleteTaskController);
taskRouter.patch("/edit-task/:id", verifyToken, editTaskController);
taskRouter.post("/task/:id/tags", verifyToken, addTaskTagController);
taskRouter.delete("/task/:id/tags/:tagId", verifyToken, removeTaskTagController);
taskRouter.post("/task/:id/subtasks", verifyToken, createSubTaskController);
taskRouter.patch("/task/:id/subtasks/:subTaskId", verifyToken, toggleSubTaskController);
taskRouter.delete("/task/:id/subtasks/:subTaskId", verifyToken, deleteSubTaskController);
taskRouter.post("/task/:id/comments", verifyToken, createTaskCommentController);
taskRouter.delete("/task/:id/comments/:commentId", verifyToken, deleteTaskCommentController);
export default taskRouter;
//# sourceMappingURL=task.routes.js.map