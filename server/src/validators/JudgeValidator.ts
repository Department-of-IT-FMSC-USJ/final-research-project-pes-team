
import { body, param } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const judgeCreateValidatorRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Judge name must be a string"),

  body("email")
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

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
];

export const judgeIdValidationRules = [
  param("id")
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