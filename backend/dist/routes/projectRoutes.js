import { Router } from "express";
import { getProjects, postProject } from "../controller/projectController";
import { verifyToken } from "../middlewares/authMiddleware";
const router = Router();
// router.get("/project");
router.post("/project", verifyToken, postProject);
router.get("/project", verifyToken, getProjects);
export default router;
//# sourceMappingURL=projectRoutes.js.map