"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionJudgeIdValidationRules = exports.sessionJudgesValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.sessionJudgesValidatorRules = [
    (0, express_validator_1.body)().isArray({ min: 1 }).withMessage("Request body must be an array of session judges"),
    (0, express_validator_1.body)("*.judgeId")
        .notEmpty()
        .withMessage("Judge ID is required")
        .isInt()
        .withMessage("Judge ID must be an integer")
        .custom(async (value) => {
        const judge = await prisma.judge.findUnique({
            where: { id: parseInt(value) },
        });
        if (!judge) {
            throw new Error("Judge not found");
        }
        return true;
    }),
    (0, express_validator_1.body)("*.sessionId")
        .notEmpty()
        .withMessage("Session ID is required")
        .isInt()
        .withMessage("Session ID must be an integer")
        .custom(async (value) => {
        const session = await prisma.session.findUnique({
            where: { id: parseInt(value) },
        });
        if (!session) {
            throw new Error("Session not found");
        }
        return true;
    }),
];
exports.sessionJudgeIdValidationRules = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Session Judge ID is required")
        .isInt()
        .withMessage("Session Judge ID must be an integer")
        .custom(async (value) => {
        const sessionJudge = await prisma.judgeSession.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        if (!sessionJudge) {
            throw new Error("Sessiion judges not found");
        }
        else {
            return true;
        }
    }),
];
//# sourceMappingURL=SessionJudgeValidator.js.map