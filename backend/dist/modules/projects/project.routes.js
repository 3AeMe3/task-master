import { Router } from "express";
import { verifyToken } from "../../shared/middleware/auth-middleware";
import { createProjectController, getProjectsController, } from "./project.controller";
const projectRouter = Router();
projectRouter.post("/project", verifyToken, createProjectController);
projectRouter.get("/project", verifyToken, getProjectsController);
export default projectRouter;
//# sourceMappingURL=project.routes.js.map