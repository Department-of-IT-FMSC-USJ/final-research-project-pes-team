"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionIdValidationRules = exports.sessionCreateValidatorRules = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.sessionCreateValidatorRules = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Session name must be a string")
        .custom(async (value) => {
        const existName = await prisma.session.findFirst({
            where: {
                name: value,
            },
        });
        if (existName) {
            throw new Error("Session name is alredy exists");
        }
        return true;
    }),
    (0, express_validator_1.body)("date")
        .notEmpty()
        .withMessage("Date is required")
        .isISO8601()
        .withMessage("Date must be a valid ISO 8601 date"),
    (0, express_validator_1.body)("time").notEmpty().withMessage("Time is required"),
    (0, express_validator_1.body)("mode")
        .notEmpty()
        .withMessage("Mode is required")
        .isIn(["online", "offline"]),
    (0, express_validator_1.body)("location").notEmpty().withMessage("Location is required"),
    (0, express_validator_1.body)("eventId")
        .notEmpty()
        .withMessage("Event ID is required")
        .isInt()
        .withMessage("Event ID must be an integer")
        .custom(async (value) => {
        const event = await prisma.event.findUnique({
            where: { id: value },
        });
        if (!event) {
            throw new Error("Session not found");
        }
        return true;
    }),
];
exports.sessionIdValidationRules = [
    (0, express_validator_1.param)("id").custom(async (value) => {
        const existName = await prisma.session.findUnique({
            where: {
                id: parseInt(value),
            },
        });
        if (!existName) {
            throw new Error("Session not found");
        }
        return true;
    }),
];
//# sourceMappingURL=SessionValidator.js.map