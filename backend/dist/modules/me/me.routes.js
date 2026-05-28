import { Router } from "express";
import { verifyToken } from "../../shared/middleware/auth-middleware.js";
import { getMeController } from "./me.controller.js";
const meRouter = Router();
meRouter.get("/me", verifyToken, getMeController);
export default meRouter;
//# sourceMappingURL=me.routes.js.map