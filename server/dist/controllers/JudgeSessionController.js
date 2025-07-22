"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllSessionJudges = exports.deleteSessionJudgeById = exports.updateSessionJudgeById = exports.getSessionJudgeById = exports.getAllSessionJudges = exports.createJudgeSession = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// create new array of objects with judgeId and sessionId
const createJudgeSession = async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data) || data.length === 0) {
            return res
                .status(400)
                .json({ error: "Invalid input data, Only accept object array" });
        }
        const createdJudgeSession = await Promise.all(data.map(({ judgeId, sessionId }) => {
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
        }));
        res.status(201).json({
            message: "Judge session created successfully",
            judgeSession: createdJudgeSession,
        });
    }
    catch (error) {
        console.error("Error creating judge session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createJudgeSession = createJudgeSession;
const getAllSessionJudges = async (req, res) => {
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
    }
    catch (error) {
        console.log("Error when get session judges", error);
        res.status(500).json({ message: "Internal server error when get" });
    }
};
exports.getAllSessionJudges = getAllSessionJudges;
const getSessionJudgeById = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching session judge by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getSessionJudgeById = getSessionJudgeById;
const updateSessionJudgeById = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error updating session judge by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateSessionJudgeById = updateSessionJudgeById;
const deleteSessionJudgeById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.judgeSession.delete({
            where: { id },
        });
        res.status(200).json({ message: "Session judge deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting session judge by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteSessionJudgeById = deleteSessionJudgeById;
const deleteAllSessionJudges = async (req, res) => {
    try {
        await prisma.judgeSession.deleteMany({});
        res.status(200).json({ message: "All session judges deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all session judges:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllSessionJudges = deleteAllSessionJudges;
const filterJudgesBySession = async (req, res) => {
    try {
        const sessionId = parseInt(req.params.sessionId, 10);
        const judges = await prisma.judgeSession.findMany({
            where: { sessionId },
            include: {
                judge: true,
            },
        });
        res.status(200).json(judges);
    }
    catch (error) {
        console.error("Error filtering judges by session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
//# sourceMappingURL=JudgeSessionController.js.map