import { body, param } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const memberCreationValidatorRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email")
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

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string"),

  body("isLeader")
    .optional()
    .isBoolean()
    .withMessage("isLeader must be a boolean"),

  body("presenterId")
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

export const memberIdValidationRules = [
  param("id")
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
