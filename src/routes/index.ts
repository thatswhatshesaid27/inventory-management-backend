import { Router } from "express";
import userRoutes from "./user.routes";
import employeeRoutes from "./employee.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);

console.log("📌 Routes index loaded");

export default router;
