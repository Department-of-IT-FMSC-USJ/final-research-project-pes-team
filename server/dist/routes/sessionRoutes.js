"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoute = void 0;
const express_1 = __importDefault(require("express"));
const SessionValidator_1 = require("../validators/SessionValidator");
const SessionController_1 = require("../controllers/SessionController");
const validatorRequest_1 = require("../middlewares/validatorRequest");
const router = express_1.default.Router();
router.post("/", SessionValidator_1.sessionCreateValidatorRules, validatorRequest_1.ValidateRequest, SessionController_1.createSession);
router.get("/", SessionController_1.getAllSessions);
router.get("/:id", SessionValidator_1.sessionIdValidationRules, validatorRequest_1.ValidateRequest, SessionController_1.getSessionById);
router.get("/event", SessionController_1.filterSessionsByEventId);
router.patch("/:id", SessionValidator_1.sessionIdValidationRules, validatorRequest_1.ValidateRequest, SessionController_1.updateSessionById);
router.delete("/", SessionController_1.deleteAllSessions);
router.delete("/:id", SessionValidator_1.sessionIdValidationRules, validatorRequest_1.ValidateRequest, SessionController_1.deleteSessionById);
exports.sessionRoute = router;
//# sourceMappingURL=sessionRoutes.js.map