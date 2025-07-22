"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoute = void 0;
const express_1 = __importDefault(require("express"));
const EventController_1 = require("../controllers/EventController");
const EventValidator_1 = require("../validators/EventValidator");
const validatorRequest_1 = require("../middlewares/validatorRequest");
const router = express_1.default.Router();
router.post("/", EventValidator_1.eventCreateValidatorRules, validatorRequest_1.ValidateRequest, EventController_1.AddEvent);
router.get("/", EventController_1.GetAllEvents);
router.get("/:id", EventController_1.getEventById);
router.patch("/:id", EventValidator_1.eventIdValidatorRules, validatorRequest_1.ValidateRequest, EventController_1.updateEventById);
router.delete("/:id", EventValidator_1.eventIdValidatorRules, validatorRequest_1.ValidateRequest, EventController_1.deleteEventById);
router.delete("/", EventController_1.deleteAllEvents);
router.get("/:eventId/filter-member", EventController_1.getFilteredMemberCriteria);
exports.eventRoute = router;
//# sourceMappingURL=eventRoutes.js.map