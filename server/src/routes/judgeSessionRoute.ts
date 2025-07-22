
import express from 'express';
import { createJudgeSession,getAllSessionJudges,getSessionJudgeById,deleteSessionJudgeById,deleteAllSessionJudges } from '../controllers/JudgeSessionController';
import { ValidateRequest } from '../middlewares/validatorRequest';
import { sessionJudgesValidatorRules,sessionJudgeIdValidationRules } from '../validators/SessionJudgeValidator';
const router=express.Router();

router.post('/', createJudgeSession);
router.get('/', getAllSessionJudges);
router.get('/:id',sessionJudgeIdValidationRules,ValidateRequest, getSessionJudgeById);
router.delete('/:id', sessionJudgeIdValidationRules, ValidateRequest, deleteSessionJudgeById );
router.delete('/',deleteAllSessionJudges);

export const judgeSessionRoute = router;