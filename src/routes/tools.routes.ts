import express from "express";
import {
  addTools,
  getTools,
  getToolsById,
  updateToolstoEmployee,
  deleteTools,
  getToolsByEmployeeId
} from "../controllers/tools.controllers";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, addTools);
router.get("/", auth, getTools);
router.get("/:id", auth, getToolsById);
router.put("/:id", auth, updateToolstoEmployee);
router.delete("/:id", auth, deleteTools);
router.get("/employees/:id", auth, getToolsByEmployeeId);

export default router;
