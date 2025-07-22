import { body, param, header } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const eventCreateValidatorRules = [
  body("name")
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


  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date"),
];

export const eventIdValidatorRules = [
  param("id")
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

