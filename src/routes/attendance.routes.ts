import {Router} from "express";
import {
  addAttendance,
  getAttendance,
  getAttendaceById,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendance.controllers";
const router = Router();

router.post("/", addAttendance);
router.get("/", getAttendance); 
router.get("/:id", getAttendaceById);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;