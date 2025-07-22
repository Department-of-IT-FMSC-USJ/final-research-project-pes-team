"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoute = void 0;
const express_1 = __importDefault(require("express"));
const MemberController_1 = require("../controllers/MemberController");
const MemberValidator_1 = require("../validators/MemberValidator");
const validatorRequest_1 = require("../middlewares/validatorRequest");
const router = express_1.default.Router();
router.post("/", MemberValidator_1.memberCreationValidatorRules, validatorRequest_1.ValidateRequest, MemberController_1.createMember);
router.get("/", MemberController_1.getAllMembers);
router.get('/:id', MemberValidator_1.memberIdValidationRules, validatorRequest_1.ValidateRequest, MemberController_1.getMemberById);
router.patch('/:id', MemberValidator_1.memberIdValidationRules, validatorRequest_1.ValidateRequest, MemberController_1.updateMemberById);
router.delete('/:id', MemberValidator_1.memberIdValidationRules, validatorRequest_1.ValidateRequest, MemberController_1.deleteMemberById);
router.delete('/', MemberController_1.deleteAllMembers);
exports.memberRoute = router;
//# sourceMappingURL=memberRoutes.js.map