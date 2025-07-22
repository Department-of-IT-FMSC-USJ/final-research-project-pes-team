"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criteriaIdValidatorRules = exports.criteriaCreateValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.criteriaCreateValidatorRules = [
    (0, express_validator_1.body)("presenterId")
        .notEmpty()
        .withMessage("Presenter ID is required")
        .isInt()
        .withMessage("Presenter ID must be an integer")
        .custom(async (value) => {
        const presenter = await prisma.presenter.findUnique({
            where: { id: value },
        });
        if (!presenter) {
            throw new Error("Presenter not found");
        }
        return true;
    }),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Criteria name is required")
        .isString()
        .withMessage("Criteria name must be a string"),
    (0, express_validator_1.body)("marks")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Marks must be a non-negative integer"),
];
exports.criteriaIdValidatorRules = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Criteria ID is required")
        .isInt()
        .withMessage("Criteria ID must be an integer")
        .custom(async (value) => {
        const criteria = await prisma.presenterCriteria.findUnique({
            where: { id: parseInt(value) },
        });
        if (!criteria) {
            throw new Error("Criteria not found");
        }
        return true;
    }),
];
//# sourceMappingURL=CriteriaValidator.js.map