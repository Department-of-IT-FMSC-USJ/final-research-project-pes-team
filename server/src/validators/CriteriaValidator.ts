import { body, param} from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criteriaCreateValidatorRules = [
  body("presenterId")
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
    body("name")
    .notEmpty()
    .withMessage("Criteria name is required")
    .isString()
    .withMessage("Criteria name must be a string"),
  body("marks")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Marks must be a non-negative integer"),
];


export const criteriaIdValidatorRules = [
  param("id")
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