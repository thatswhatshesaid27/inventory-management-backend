import { Router } from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controllers";

const router = Router();

// 🔥 This log confirms routes are mounted correctly
console.log("📌 Employee routes mounted");

// 🔥 Middleware to confirm the POST request reaches this router
router.use((req, res, next) => {
  console.log(`➡️ Employee Route Hit: [${req.method}] ${req.originalUrl}`);
  next();
});

// GET all employees
router.get("/", getEmployees);

// GET employee by ID
router.get("/:id", getEmployeeById);

// POST create employee
router.post("/", (req, res, next) => {
  console.log("🔥 POST /api/employees reached");
  console.log("📝 Body Received:", req.body);
  next();
}, createEmployee);

// PUT update employee
router.put("/:id", updateEmployee);

// DELETE employee
router.delete("/:id", deleteEmployee);

export default router;
