import { body, param } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sessionCreateValidatorRules = [
  body("name")
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

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date"),

  body("time").notEmpty().withMessage("Time is required"),

  body("mode")
    .notEmpty()
    .withMessage("Mode is required")
    .isIn(["online", "offline"]),

  body("location").notEmpty().withMessage("Location is required"),
  body("eventId")
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

export const sessionIdValidationRules = [
  param("id").custom(async (value) => {
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
