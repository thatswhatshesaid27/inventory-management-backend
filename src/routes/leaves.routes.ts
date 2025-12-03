import {Router} from "express";
import {
  applyLeave,
  getLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeave,
  getLeavesByEmployeeId
} from "../controllers/leaves.controllers";

const router = Router();    

router.post("/", applyLeave);
router.get("/", getLeaves);
router.get("/:id", getLeaveById);
router.put("/:id", updateLeaveStatus);
router.delete("/:id", deleteLeave);
router.get("/employee/:id", getLeavesByEmployeeId);

export default router;