import { Router } from "express";
import userRoutes from "./user.routes";
import employeeRoutes from "./employee.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);

export default router;
