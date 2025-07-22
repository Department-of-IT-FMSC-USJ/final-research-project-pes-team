"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllPresenters = exports.deletePresenterById = exports.updatePresenterById = exports.getAllPresenters = exports.getPresenterById = exports.createPresenter = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPresenter = async (req, res) => {
    try {
        const { type, groupName, sessionId, members } = req.body;
        // Create a presenter for each member
        const createdPresenters = await prisma.presenter.create({
            data: {
                type,
                groupName,
                sessionId,
                members: {
                    connect: members.map((m) => ({
                        id: m.memberId,
                    })),
                },
            },
        });
        res.status(201).json({
            message: "Presenters created successfully",
            presenters: createdPresenters,
        });
    }
    catch (error) {
        console.error("Error creating presenters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createPresenter = createPresenter;
const getPresenterById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const presenter = await prisma.presenter.findUnique({
            where: { id },
            include: {
                members: true,
            },
        });
        res.status(200).json(presenter);
    }
    catch (error) {
        console.error("Error fetching presenter by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPresenterById = getPresenterById;
const getAllPresenters = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching all presenters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllPresenters = getAllPresenters;
const updatePresenterById = async (req, res) => {
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
                    connect: members.map((m) => ({
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
    }
    catch (error) {
        console.error("Error updating presenter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updatePresenterById = updatePresenterById;
const deletePresenterById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.presenter.delete({
            where: { id },
        });
        res.status(200).json({ message: "Presenter deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting presenter:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deletePresenterById = deletePresenterById;
const deleteAllPresenters = async (req, res) => {
    try {
        await prisma.presenter.deleteMany({});
        res.status(200).json({ message: "All presenters deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all presenters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllPresenters = deleteAllPresenters;
//# sourceMappingURL=PresenterController.js.map