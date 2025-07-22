"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSingleQRCode = exports.getFilteredMemberCriteria = exports.deleteAllEvents = exports.deleteEventById = exports.updateEventById = exports.getEventById = exports.GetAllEvents = exports.AddEvent = void 0;
const client_1 = require("@prisma/client");
const qrcode_1 = __importDefault(require("qrcode"));
const Email_1 = require("../nodemailer/Email");
const prisma = new client_1.PrismaClient();
const AddEvent = async (req, res) => {
    try {
        const newEvent = await prisma.event.create({
            data: req.body,
        });
        res.status(201).json({
            message: "Event added successfully",
            event: newEvent,
        });
    }
    catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.AddEvent = AddEvent;
const GetAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                sessions: true,
            },
        });
        res.status(200).json(events);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.GetAllEvents = GetAllEvents;
const getEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const event = await prisma.event.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                criteriaList: true,
                sessions: {
                    select: {
                        id: true,
                        name: true,
                        date: true,
                        time: true,
                        mode: true,
                        location: true,
                        presenters: {
                            select: {
                                id: true,
                                type: true,
                                groupName: true,
                                members: true,
                            },
                        },
                        sessionJudges: {
                            select: {
                                judge: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        phone: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        res.status(200).json(event);
    }
    catch (error) {
        console.error("Error fetching event by ID:", error);
        throw new Error("Internal server error");
    }
};
exports.getEventById = getEventById;
const updateEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const event = await prisma.event.update({
            where: { id },
            data: {
                name: req.body.name ? req.body.name : undefined,
                date: req.body.date ? new Date(req.body.date) : undefined,
                status: req.body.status ? req.body.status : undefined,
            },
        });
        res.status(200).json({
            message: "Event updated successfully",
            event,
        });
    }
    catch (error) {
        console.error("Error updating event by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateEventById = updateEventById;
const deleteEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.event.delete({
            where: { id },
        });
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting event by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteEventById = deleteEventById;
const deleteAllEvents = async (req, res) => {
    try {
        await prisma.event.deleteMany({});
        res.status(200).json({ message: "All events deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllEvents = deleteAllEvents;
const getFilteredMemberCriteria = async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId, 10);
        const sessionId = parseInt(req.query.sessionId);
        const memberId = parseInt(req.query.memberId);
        if (!sessionId || !memberId) {
            return res
                .status(400)
                .json({ error: "sessionId and memberId are required" });
        }
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            select: {
                id: true,
                name: true,
                criteriaList: true,
                sessions: {
                    where: { id: sessionId },
                    select: {
                        id: true,
                        name: true,
                        presenters: {
                            where: {
                                members: {
                                    some: { id: memberId },
                                },
                            },
                            select: {
                                id: true,
                                type: true,
                                groupName: true,
                                members: {
                                    where: { id: memberId },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!event || event.sessions.length === 0) {
            return res
                .status(404)
                .json({ error: "No matching session or event found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error("Error filtering member criteria:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getFilteredMemberCriteria = getFilteredMemberCriteria;
//generate a QR code for the event
// GET /generate-qr?eventId=1&sessionId=2&memberId=5
const generateSingleQRCode = async (req, res) => {
    try {
        const { eventId, sessionId, memberId } = req.query;
        const { email } = req.params;
        if (!eventId || !sessionId || !memberId) {
            return res.status(400).json({ error: "Missing query parameters" });
        }
        const payload = {
            eventId: parseInt(eventId, 10),
            sessionId: parseInt(sessionId, 10),
            memberId: parseInt(memberId, 10),
        };
        const encodedPayload = JSON.stringify(payload); // JSON string
        const qr = await qrcode_1.default.toDataURL(encodedPayload); // Base64 PNG
        await (0, Email_1.sendMail)({
            to: email,
            subject: "Your QR Code",
            html: "<p>Here is your QR code:</p><img src='cid:qr-image' />",
            qrBase64: qr,
        });
        res.status(200).json({
            data: encodedPayload,
            qr, // base64 image data
        });
    }
    catch (error) {
        console.error("Error generating QR:", error);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
};
exports.generateSingleQRCode = generateSingleQRCode;
//# sourceMappingURL=EventController.js.map