import { Router } from "express";
import { getProjects, postProject } from "../controller/projectController";
const router = Router();

// router.get("/project");
router.post("/project", postProject);
router.get("/project", getProjects);
export default router;
