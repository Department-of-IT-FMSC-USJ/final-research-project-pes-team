import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createSession = async (req: Request, res: Response) => {
  try {
    const createEvent = await prisma.session.create({
      data: req.body,
      include: {
        event: true,
        presenters: true,
      },
      omit: {
        eventId: true,
      },
    });
    res.status(201).json({
      message: "Session created successfully",
      session: createEvent,
    });
  } catch (error) {
    console.log("Error adding session", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        event: true,
        sessionJudges: true,
        presenters: true,
      },
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        event: true,
        sessionJudges: {
          include: {
            judge: true,
          },
        },
        presenters: true,
      },
    });

    res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSessionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const session = await prisma.session.update({
      data: {
        name: req.body.name ? req.body.name : undefined,
        date: req.body.date ? new Date(req.body.date) : undefined,
        time: req.body.time ? req.body.time : undefined,
        mode: req.body.mode ? req.body.mode : undefined,
        location: req.body.location ? req.body.location : undefined,
        eventId: req.body.eventId ? req.body.eventId : undefined,
      },
      where: { id },
    });

    res.status(200).json({ message: "Session updated successfuly", session });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSessionById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        presenters: true,
        sessionJudges: true,
      },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    if (session.presenters.length > 0 || session.sessionJudges.length > 0) {
      return res.status(400).json({
        error: "Cannot delete session with assigned presenters or judges",
      });
    }
    await prisma.session.delete({
      where: { id },
      include: {
        presenters: true,
        sessionJudges: true,
      },
    });

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllSessions = async (req: Request, res: Response) => {
  try {
    await prisma.session.deleteMany({});
    res.status(200).json({ message: "All sessions deleted successfully" });
  } catch (error) {
    console.error("Error deleting all sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterSessionsByEventId = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.query.id as string, 10);
    const sessions = await prisma.session.findMany({
      where: { eventId },
      include: {
        event: true,
        sessionJudges: true,
        presenters: true,
      },
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error filtering sessions by event ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
