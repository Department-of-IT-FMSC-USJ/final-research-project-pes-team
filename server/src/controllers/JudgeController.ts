
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import generator from "generate-password";

const prisma = new PrismaClient();

export const createJudge = async (req: Request, res: Response) => {
  try {

    
// generate a random password
    const generateRandomPassword = generator.generate({
      length: 6,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
      excludeSimilarCharacters: true,
    });

    const newJudge = await prisma.judge.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordId: generateRandomPassword,
        category: req.body.category,
      },
      include: {
        sessions: true,
      },
    });

    res.status(201).json({
      message: "Judge created successfully",
      judge: newJudge,
    });
  } catch (error) {
    console.error("Error creating judge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllJudges = async (req: Request, res: Response) => {
  try {
    const judges = await prisma.judge.findMany({
      include: {
        sessions: true,
       
      },
    });
    res.status(200).json(judges);
  } catch (error) {
    console.error("Error fetching judges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getJudgeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    const judge = await prisma.judge.findUnique({
      where: { id },
      include: {
        sessions: true,
      },
    });

    res.status(200).json(judge);
  } catch (error) {
    console.error("Error fetching judge by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateJudgeById =async (req:Request, res:Response) => {
    try{
    const id = parseInt(req.params.id,10);
    const updatedJudge = await prisma.judge.update({
        where: { id },
        data: {
            name: req.body.name ? req.body.name : undefined,
            email: req.body.email ? req.body.email : undefined,
            phone: req.body.phone ? req.body.phone : undefined,
            category: req.body.category ? req.body.category : undefined,
        },
        include: {
            sessions: true,
        },
    });
    res.status(200).json({
        message: "Judge updated successfully",
        judge: updatedJudge,
    });
    }catch (error) {
        console.error("Error updating judge by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteJudgeById = async (req: Request, res: Response)=>{
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.judge.delete({
        where: { id },
        });
        res.status(200).json({ message: "Judge deleted successfully" });
    } catch (error) {
        console.error("Error deleting judge by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const deleteAllJudges = async (req: Request, res: Response) => {
  try {
    await prisma.judge.deleteMany();
    res.status(200).json({ message: "All judges deleted successfully" });
  } catch (error) {
    console.error("Error deleting all judges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};