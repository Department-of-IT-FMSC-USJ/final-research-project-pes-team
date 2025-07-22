"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenterRoute = void 0;
const express_1 = __importDefault(require("express"));
const validatorRequest_1 = require("../middlewares/validatorRequest");
const PresenterController_1 = require("../controllers/PresenterController");
const PresentorValidator_1 = require("../validators/PresentorValidator");
const router = express_1.default.Router();
router.post("/", PresenterController_1.createPresenter);
router.get("/:id", PresentorValidator_1.presenterIdValidationRules, validatorRequest_1.ValidateRequest, PresenterController_1.getPresenterById);
router.get("/", PresenterController_1.getAllPresenters);
router.patch("/:id", PresentorValidator_1.presenterIdValidationRules, validatorRequest_1.ValidateRequest, PresenterController_1.updatePresenterById);
router.delete("/:id", PresentorValidator_1.presenterIdValidationRules, validatorRequest_1.ValidateRequest, PresenterController_1.deletePresenterById);
router.delete("/", PresenterController_1.deleteAllPresenters);
exports.presenterRoute = router;
//# sourceMappingURL=presenterRoutes.js.map