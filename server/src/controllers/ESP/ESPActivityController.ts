import { Request, Response } from "express";

let latestScan: {
  eventId: number;
  sessionId: number;
  memberId: number;
} | null = null;


export const receiveScan = async (req: Request, res: Response) => {
  try {
    const { eventId, sessionId, memberId } = req.body;

    if (!eventId || !sessionId || !memberId) {
      return res.status(400).json({ error: "Missing query parameters" });
    }

    latestScan = {
      eventId: Number(eventId),
      sessionId: Number(sessionId),
      memberId: Number(memberId),
    };
    res.status(200).json({ message: "Scan received successfully" });
  } catch (error) {
    console.error("Error processing scan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// get /api/esp-activity/latest
export const getLatestScan = async (_req: Request, res: Response) => {
  if (!latestScan) {
    return res.status(200).json({ message: "No scan found" });
  }

  return res.status(200).json(latestScan);
};