import express from "express";
import {
  createJudge,
  getAllJudges,
  getJudgeById,
  updateJudgeById,
  deleteJudgeById,
  deleteAllJudges,
} from "../controllers/JudgeController";
import {
  judgeCreateValidatorRules,
  judgeIdValidationRules,
} from "../validators/JudgeValidator";
import { ValidateRequest } from "../middlewares/validatorRequest";

const router = express.Router();

router.post("/", createJudge);
router.get("/", getAllJudges);
router.get("/:id", judgeIdValidationRules, ValidateRequest, getJudgeById);
router.patch("/:id", judgeIdValidationRules, ValidateRequest, updateJudgeById);
router.delete("/:id", judgeIdValidationRules, ValidateRequest, deleteJudgeById);
router.delete("/", deleteAllJudges);

export const judgeRoute = router;
