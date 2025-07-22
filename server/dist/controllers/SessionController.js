"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSessionsByEventId = exports.deleteAllSessions = exports.deleteSessionById = exports.updateSessionById = exports.getSessionById = exports.getAllSessions = exports.createSession = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSession = async (req, res) => {
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
    }
    catch (error) {
        console.log("Error adding session", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createSession = createSession;
const getAllSessions = async (req, res) => {
    try {
        const sessions = await prisma.session.findMany({
            include: {
                event: true,
                sessionJudges: true,
                presenters: true,
            },
        });
        res.status(200).json(sessions);
    }
    catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllSessions = getAllSessions;
const getSessionById = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching session by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getSessionById = getSessionById;
const updateSessionById = async (req, res) => {
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
    }
    catch (error) {
        console.log("Internal server error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateSessionById = updateSessionById;
const deleteSessionById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.session.delete({
            where: { id },
        });
        res.status(200).json({ message: "Session deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteSessionById = deleteSessionById;
const deleteAllSessions = async (req, res) => {
    try {
        await prisma.session.deleteMany({});
        res.status(200).json({ message: "All sessions deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all sessions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllSessions = deleteAllSessions;
const filterSessionsByEventId = async (req, res) => {
    try {
        const eventId = parseInt(req.query.id, 10);
        const sessions = await prisma.session.findMany({
            where: { eventId },
            include: {
                event: true,
                sessionJudges: true,
                presenters: true,
            },
        });
        res.status(200).json(sessions);
    }
    catch (error) {
        console.error("Error filtering sessions by event ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.filterSessionsByEventId = filterSessionsByEventId;
//# sourceMappingURL=SessionController.js.map