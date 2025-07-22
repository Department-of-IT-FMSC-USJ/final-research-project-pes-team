"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberIdValidationRules = exports.memberCreationValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.memberCreationValidatorRules = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .custom(async (value) => {
        const existingMember = await prisma.members.findUnique({
            where: { email: value },
        });
        if (existingMember) {
            throw new Error("Email already exists");
        }
        return true;
    })
        .isEmail()
        .withMessage("Email must be a valid email address"),
    (0, express_validator_1.body)("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .isString()
        .withMessage("Phone number must be a string"),
    (0, express_validator_1.body)("isLeader")
        .optional()
        .isBoolean()
        .withMessage("isLeader must be a boolean"),
    (0, express_validator_1.body)("presenterId")
        .optional()
        .isInt()
        .withMessage("Presenter ID must be an integer")
        .custom(async (value) => {
        if (value) {
            const presenter = await prisma.presenter.findUnique({
                where: { id: value },
            });
            if (!presenter) {
                throw new Error("Presenter not found");
            }
        }
        return true;
    }),
];
exports.memberIdValidationRules = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Member ID is required")
        .isInt()
        .withMessage("Member ID must be an integer")
        .custom(async (value) => {
        const member = await prisma.members.findUnique({
            where: { id: parseInt(value, 10) },
        });
        if (!member) {
            throw new Error("Member not found");
        }
        return true;
    }),
];
//# sourceMappingURL=MemberValidator.js.map