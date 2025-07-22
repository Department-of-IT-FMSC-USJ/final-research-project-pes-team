"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenterIdValidationRules = exports.presenterCreationValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.presenterCreationValidatorRules = [
    (0, express_validator_1.body)("type")
        .notEmpty()
        .withMessage("Type is required")
        .isIn(["Individual", "Group"])
        .withMessage("Type must be either 'individual' or 'group'"),
    (0, express_validator_1.body)("groupName")
        .optional()
        .isString()
        .withMessage("Group name must be a string")
        .isLength({ min: 1 })
        .withMessage("Group name must not be empty"),
    (0, express_validator_1.body)("sessionId")
        .notEmpty()
        .withMessage("Session ID is required")
        .isInt()
        .withMessage("Session ID must be an integer")
        .custom(async (value) => {
        const session = await prisma.session.findUnique({
            where: { id: parseInt(value) },
        });
        if (!session) {
            throw new Error("Session ID does not exist");
        }
        return true;
    }),
    (0, express_validator_1.body)("members")
        .isArray()
        .withMessage("Members must be an array")
        .custom((members) => {
        if (members.length === 0) {
            throw new Error("At least one member is required");
        }
    })
];
exports.presenterIdValidationRules = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Presenter ID is required")
        .isInt()
        .withMessage("Presenter ID must be an integer")
];
//# sourceMappingURL=PresentorValidator.js.map