import express from "express";
import {
  createPresenterCriteria,
  getPresenterCriteriaById,
  getAllPresenterCriteria,
  updatePresenterCriteriaById,
  deleteAllPresenterCriteria,
  deletePresenterCriteriaById
} from "../controllers/PresenterCriteria";
import { criteriaCreateValidatorRules,criteriaIdValidatorRules } from "../validators/CriteriaValidator";
import {ValidateRequest} from "../middlewares/validatorRequest";

const router = express.Router();
router.post("/", createPresenterCriteria);
router.get("/:id", getPresenterCriteriaById);
router.get("/", getAllPresenterCriteria);
router.patch("/:id", updatePresenterCriteriaById);
router.delete("/", deleteAllPresenterCriteria);
router.delete("/:id",deletePresenterCriteriaById);

export const criteriaRoutes = router;
