import express from "express";
import {
  createSalary,
  getSalaries,
  getSalaryById,
  getSalaryByEmployee,
  updateSalary,
  deleteSalary
} from "../controllers/salary.controllers";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, createSalary);
router.get("/", auth, getSalaries);
router.get("/:id", auth, getSalaryById);
router.get("/employee/:id", auth, getSalaryByEmployee);
router.put("/:id", auth, updateSalary);
router.delete("/:id", auth, deleteSalary);

export default router;
