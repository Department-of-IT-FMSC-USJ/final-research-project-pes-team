"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.judgeRoute = void 0;
const express_1 = __importDefault(require("express"));
const JudgeController_1 = require("../controllers/JudgeController");
const JudgeValidator_1 = require("../validators/JudgeValidator");
const validatorRequest_1 = require("../middlewares/validatorRequest");
const router = express_1.default.Router();
router.post("/", JudgeController_1.createJudge);
router.get("/", JudgeController_1.getAllJudges);
router.get("/:id", JudgeValidator_1.judgeIdValidationRules, validatorRequest_1.ValidateRequest, JudgeController_1.getJudgeById);
router.patch("/:id", JudgeValidator_1.judgeIdValidationRules, validatorRequest_1.ValidateRequest, JudgeController_1.updateJudgeById);
router.delete("/:id", JudgeValidator_1.judgeIdValidationRules, validatorRequest_1.ValidateRequest, JudgeController_1.deleteJudgeById);
router.delete("/", JudgeController_1.deleteAllJudges);
exports.judgeRoute = router;
//# sourceMappingURL=judgeRoutes.js.map