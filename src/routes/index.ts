import { Router } from "express";
import userRoutes from "./user.routes";
import employeeRoutes from "./employee.routes";
import login from "./login.routes";
import leaveRoutes from "./leaves.routes";
const router = Router();

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);
router.use("/auth", login);
router.use("/leaves", leaveRoutes);

console.log("📌 Routes index loaded");

export default router;
