import { Router } from "express";

import { verifyToken } from "../../shared/middleware/auth-middleware";
import { getMeController } from "./me.controller";

const meRouter = Router();

meRouter.get("/me", verifyToken, getMeController);

export default meRouter;
