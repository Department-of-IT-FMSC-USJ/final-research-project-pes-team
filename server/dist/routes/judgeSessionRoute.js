"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.judgeSessionRoute = void 0;
const express_1 = __importDefault(require("express"));
const JudgeSessionController_1 = require("../controllers/JudgeSessionController");
const validatorRequest_1 = require("../middlewares/validatorRequest");
const SessionJudgeValidator_1 = require("../validators/SessionJudgeValidator");
const router = express_1.default.Router();
router.post('/', JudgeSessionController_1.createJudgeSession);
router.get('/', JudgeSessionController_1.getAllSessionJudges);
router.get('/:id', SessionJudgeValidator_1.sessionJudgeIdValidationRules, validatorRequest_1.ValidateRequest, JudgeSessionController_1.getSessionJudgeById);
router.delete('/:id', SessionJudgeValidator_1.sessionJudgeIdValidationRules, validatorRequest_1.ValidateRequest, JudgeSessionController_1.deleteSessionJudgeById);
router.delete('/', JudgeSessionController_1.deleteAllSessionJudges);
exports.judgeSessionRoute = router;
//# sourceMappingURL=judgeSessionRoute.js.map