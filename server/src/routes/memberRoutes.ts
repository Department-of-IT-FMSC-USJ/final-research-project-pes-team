import express from "express";
import { createMember,deleteAllMembers,deleteMemberById,getAllMembers,getMemberById, updateMemberById} from "../controllers/MemberController";
import { memberCreationValidatorRules, memberIdValidationRules } from "../validators/MemberValidator";
import { ValidateRequest } from "../middlewares/validatorRequest";

const router = express.Router();

router.post("/", memberCreationValidatorRules, ValidateRequest, createMember);
router.get("/", getAllMembers);
router.get('/:id',memberIdValidationRules, ValidateRequest,getMemberById);
router.patch('/:id',memberIdValidationRules, ValidateRequest, updateMemberById);
router.delete('/:id', memberIdValidationRules, ValidateRequest, deleteMemberById);
router.delete('/', deleteAllMembers);

export const memberRoute = router;
