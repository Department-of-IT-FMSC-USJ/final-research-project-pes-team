import { body, param } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const presenterCreationValidatorRules = [
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["Individual", "Group"])
    .withMessage("Type must be either 'individual' or 'group'"),

  body("groupName")
    .optional()
    .isString()
    .withMessage("Group name must be a string")
    .isLength({ min: 1 })
    .withMessage("Group name must not be empty"),
  
  body("sessionId")
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
  body("members")
   .isArray()
   .withMessage("Members must be an array")
   .custom((members) => {
     if (members.length === 0) {
       throw new Error("At least one member is required");
     }
    })
];


export const presenterIdValidationRules = [
  param("id")
    .notEmpty()
    .withMessage("Presenter ID is required")
    .isInt()
    .withMessage("Presenter ID must be an integer")
   

];