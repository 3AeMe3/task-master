import { Router } from "express";
import { loginUser, logOutUser, registerUser, } from "../controller/authController";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logOut", logOutUser);
export default router;
//# sourceMappingURL=authRoutes.js.map