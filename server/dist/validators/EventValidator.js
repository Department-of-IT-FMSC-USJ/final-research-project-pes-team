"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventIdValidatorRules = exports.eventCreateValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.eventCreateValidatorRules = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Event name must be a string")
        .custom(async (value) => {
        const existingEvent = await prisma.event.findFirst({
            where: { name: value },
        });
        if (existingEvent) {
            throw new Error("Event with this name already exists");
        }
        return true;
    }),
    (0, express_validator_1.body)("date")
        .notEmpty()
        .withMessage("Date is required")
        .isISO8601()
        .withMessage("Date must be a valid ISO 8601 date"),
];
exports.eventIdValidatorRules = [
    (0, express_validator_1.param)("id")
        .notEmpty()
        .withMessage("Event ID is required")
        .isInt()
        .withMessage("Event ID must be an integer")
        .custom(async (value) => {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(value) },
        });
        if (!event) {
            throw new Error("Event not found");
        }
    }),
];
//# sourceMappingURL=EventValidator.js.map