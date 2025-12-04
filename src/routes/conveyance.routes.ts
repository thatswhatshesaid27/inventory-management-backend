import { Router } from "express";
import { addConveyance, deleteConveyance, getConveyance, getConveyanceByEmployeeId, getLeaveById, updateConveyanceStatus } from "../controllers/conveyance.controllers";

const router = Router();

router.post("/", addConveyance);
router.get("/", getConveyance);
router.get("/:id", getLeaveById);
router.put("/:id", updateConveyanceStatus);
router.delete("/:id", deleteConveyance);
router.get("/employee/:id", getConveyanceByEmployeeId);

export default router;