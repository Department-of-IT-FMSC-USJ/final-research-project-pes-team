import { body, param, header } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sessionJudgesValidatorRules = [
body().isArray({min:1}).withMessage("Request body must be an array of session judges"),
  body("*.judgeId")
    .notEmpty()
    .withMessage("Judge ID is required")
    .isInt()
    .withMessage("Judge ID must be an integer")
    .custom(async (value) => {
      const judge = await prisma.judge.findUnique({
        where: { id:parseInt( value) },
      });
      if (!judge) {
        throw new Error("Judge not found");
      }
      return true;
    }),

  body("*.sessionId")
    .notEmpty()
    .withMessage("Session ID is required")
    .isInt()
    .withMessage("Session ID must be an integer")
    .custom(async (value) => {
      const session = await prisma.session.findUnique({
        where: { id: parseInt(value) },
      });
      if (!session) {
        throw new Error("Session not found");
      }
      return true;
    }),
];

export const sessionJudgeIdValidationRules = [
  param("id")
    .notEmpty()
    .withMessage("Session Judge ID is required")
    .isInt()
    .withMessage("Session Judge ID must be an integer")
    .custom(async (value) => {
      const sessionJudge = await prisma.judgeSession.findUnique({
        where: {
          id: parseInt(value),
        },
      });

      if (!sessionJudge) {
        throw new Error("Sessiion judges not found");
      } else {
        return true;
      }
    }),
];

