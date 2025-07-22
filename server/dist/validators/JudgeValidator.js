"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.judgeIdValidationRules = exports.judgeCreateValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.judgeCreateValidatorRules = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Judge name must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be a valid email address")
        .custom(async (value) => {
        const existEmail = await prisma.judge.findFirst({
            where: { email: value },
        });
        if (existEmail) {
            throw new Error("Judge email already exists");
        }
        return true;
    }),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isString()
        .withMessage("Phone number must be a string"),
    (0, express_validator_1.body)("category")
        .notEmpty()
        .withMessage("Category is required")
        .isString()
        .withMessage("Category must be a string"),
];
exports.judgeIdValidationRules = [
    (0, express_validator_1.param)("id")
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
];
//# sourceMappingURL=JudgeValidator.js.map