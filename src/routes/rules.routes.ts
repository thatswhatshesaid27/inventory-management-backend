import { Router } from "express";

import { addRules, deleteRules, getRules, getRulesById, updateRules } from "../controllers/rules.controllers";

const router = Router();

router.post("/", addRules);
router.get("/", getRules);
router.get("/:id", getRulesById);
router.put("/:id", updateRules);
router.delete("/:id", deleteRules);

export default router;