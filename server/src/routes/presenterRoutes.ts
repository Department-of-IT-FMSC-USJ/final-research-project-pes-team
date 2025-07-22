import express from "express";
import { ValidateRequest } from "../middlewares/validatorRequest";
import {
  createPresenter,
  getPresenterById,
  getAllPresenters,
  updatePresenterById,
  deletePresenterById,
  deleteAllPresenters
} from "../controllers/PresenterController";
import { presenterCreationValidatorRules,presenterIdValidationRules } from "../validators/PresentorValidator";

const router = express.Router();

router.post("/",createPresenter);
router.get("/:id", presenterIdValidationRules,ValidateRequest,getPresenterById);
router.get("/", getAllPresenters);
router.patch("/:id", presenterIdValidationRules,ValidateRequest,updatePresenterById);
router.delete("/:id", presenterIdValidationRules, ValidateRequest,deletePresenterById  )
router.delete("/",deleteAllPresenters);
export const presenterRoute = router;
