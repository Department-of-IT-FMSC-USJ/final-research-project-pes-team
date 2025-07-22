import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// create new array of objects with judgeId and sessionId

export const createJudgeSession = async (req: Request, res: Response) => {
  try {
    const data = req.body as { judgeId: number; sessionId: number }[];

    if (!Array.isArray(data) || data.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input data, Only accept object array" });
    }

    const createdJudgeSession = await Promise.all(
      data.map(
        ({ judgeId, sessionId }: { judgeId: number; sessionId: number }) => {
          return prisma.judgeSession.create({
            data: {
              judgeId,
              sessionId,
            },
            include: {
              judge: true,
              session: true,
            },
          });
        }
      )
    );
    res.status(201).json({
      message: "Judge session created successfully",
      judgeSession: createdJudgeSession,
    });
  } catch (error) {
    console.error("Error creating judge session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllSessionJudges = async (req: Request, res: Response) => {
  try {
    const getSessionJudges = await prisma.judgeSession.findMany({
      include: {
        judge: true,
        session: true,
        
      },
        omit: {
            judgeId: true,
            sessionId: true,
        },
    });
    res.status(200).json({ getSessionJudges });
  } catch (error) {
    console.log("Error when get session judges", error);
    res.status(500).json({ message: "Internal server error when get" });
  }
};


export const getSessionJudgeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const sessionJudge = await prisma.judgeSession.findUnique({
      where: { id },
      include: {
        judge: true,
        session: true,
      },
      omit: {
        judgeId: true,
        sessionId: true,
      },
    });

    res.status(200).json(sessionJudge);
  } catch (error) {
    console.error("Error fetching session judge by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSessionJudgeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { judgeId, sessionId } = req.body;

    const updatedSessionJudge = await prisma.judgeSession.update({
      where: { id },
      data: {
        judgeId,
        sessionId,
      },
      include: {
        judge: true,
        session: true,
      },
    });

    res.status(200).json({
      message: "Session judge updated successfully",
      sessionJudge: updatedSessionJudge,
    });
  } catch (error) {
    console.error("Error updating session judge by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSessionJudgeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.judgeSession.delete({
      where: { id },
    });

    res.status(200).json({ message: "Session judge deleted successfully" });
  } catch (error) {
    console.error("Error deleting session judge by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllSessionJudges = async (req: Request, res: Response) => {
  try {
    await prisma.judgeSession.deleteMany({});
    res.status(200).json({ message: "All session judges deleted successfully" });
  } catch (error) {
    console.error("Error deleting all session judges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const filterJudgesBySession= async (req: Request, res: Response) => {
  try {


    const sessionId = parseInt(req.params.sessionId, 10);
    const judges = await prisma.judgeSession.findMany({
      where: { sessionId },
      include: {
        judge: true,
      },
    });

    res.status(200).json(judges);
  } catch (error) {
    console.error("Error filtering judges by session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}