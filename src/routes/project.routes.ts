import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByEmployee
} from "../controllers/project.controllers";
import { auth } from "../middleware/auth";

const router = express.Router();

console.log("📌 Project routes mounted");
router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
router.get("/employee/:id", auth, getProjectsByEmployee);

export default router;
