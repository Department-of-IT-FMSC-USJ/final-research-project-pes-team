import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import generator from "generate-password";

const prisma = new PrismaClient();



export const createMember = async (req: Request, res: Response) => {
  try {
    // Generate a random member ID
const generateRandomMemberId = generator.generate({
  length: 6,
  numbers: true,
  symbols: false,
  uppercase: true,
  lowercase:false,
  excludeSimilarCharacters: true,
});
    const { name, email, phone, isLeader } = req.body;

    const newMember = await prisma.members.create({
      data: {
        name,
        email,
        phone,
        isLeader,
        memberId: generateRandomMemberId,
      },
    });

    res
      .status(201)
      .json({ message: "Member created successfully", member: newMember });
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.members.findMany({
      include: {
        presenters: true, 
      },
    });
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const member = await prisma.members.findUnique({
      where: { id },
      include: {
        presenters: true, 
      },
    });

    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMemberById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, phone, marks,isLeader } = req.body;

    const member = await prisma.members.update({
      where: { id },
      data: {
        name: name ? name : undefined,
        email: email ? email : undefined,
        phone: phone ? phone : undefined,
        marks: marks ? marks : undefined,
        isLeader: isLeader? isLeader : undefined,
      },
    });

    res.status(200).json({
      message: "Member updated successfully",
      member,
    });
  } catch (error) {
    console.error("Error updating member by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMemberById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    await prisma.members.delete({
      where: { id },
    });

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAllMembers = async (req: Request, res: Response) => {
  try {
    await prisma.members.deleteMany();
    res.status(200).json({ message: "All members deleted successfully" });
  } catch (error) {
    console.error("Error deleting all members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
