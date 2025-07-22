import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPresenter = async (req: Request, res: Response) => {
  try {
    const { type, groupName, sessionId, members } = req.body;

    // Create a presenter for each member
    const createdPresenters = await prisma.presenter.create({
      data: {
        type,
        groupName,
        sessionId,
        members: {
          connect: members.map((m: { memberId: number }) => ({
            id: m.memberId,
          })),
        },
      },
     
    });
    res.status(201).json({
      message: "Presenters created successfully",
      presenters: createdPresenters,
    });
  } catch (error) {
    console.error("Error creating presenters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPresenterById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const presenter = await prisma.presenter.findUnique({
      where: { id },
      include: {
        members: true,
      
      },
    });
    res.status(200).json(presenter);
  } catch (error) {
    console.error("Error fetching presenter by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPresenters = async (req: Request, res: Response) => {
  try {
    const presenters = await prisma.presenter.findMany({
      include: {
        members: true,
       
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(presenters);
  } catch (error) {
    console.error("Error fetching all presenters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePresenterById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { type, groupName, marks, sessionId, members } = req.body
      ? req.body
      : undefined;

    const updatedPresenter = await prisma.presenter.update({
      where: { id },
      data: {
        type,
        groupName,
        sessionId,
        members: {
          connect: members.map((m: { memberId: number }) => ({
            id: m.memberId,
          })),
        },
      },
      include: {
        members: true,
      },
    });
    res.status(200).json({
      message: "Presenter updated successfully",
      presenter: updatedPresenter,
    });
  } catch (error) {
    console.error("Error updating presenter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePresenterById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.presenter.delete({
      where: { id },
    });
    res.status(200).json({ message: "Presenter deleted successfully" });
  } catch (error) {
    console.error("Error deleting presenter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteAllPresenters = async (req: Request, res: Response) => {
  try {
    await prisma.presenter.deleteMany({});
    res.status(200).json({ message: "All presenters deleted successfully" });
  } catch (error) {
    console.error("Error deleting all presenters:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};