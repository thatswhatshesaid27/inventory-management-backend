import { Router } from "express";
import userRoutes from "./user.routes";
import employeeRoutes from "./employee.routes";
import login from "./login.routes";
import leaveRoutes from "./leaves.routes";
import projectRoutes from "./project.routes";
import salaryRoutes from "./salary.routes";
import conveyanceRoutes from "./conveyance.routes";
import toolsRoutes from "./tools.routes";
import rulesRoutes from "./rules.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);
router.use("/auth", login);
router.use("/leaves", leaveRoutes);
router.use("/projects", projectRoutes);
router.use("/salaries", salaryRoutes);
router.use("/conveyances", conveyanceRoutes);
router.use("/tools", toolsRoutes);
router.use("/rules", rulesRoutes);
console.log("📌 Routes index loaded");

export default router;
