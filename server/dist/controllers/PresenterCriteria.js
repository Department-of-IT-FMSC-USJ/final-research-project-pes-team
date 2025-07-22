"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllPresenterCriteria = exports.deletePresenterCriteriaById = exports.updatePresenterCriteriaById = exports.getAllPresenterCriteria = exports.getPresenterCriteriaById = exports.createPresenterCriteria = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPresenterCriteria = async (req, res) => {
    try {
        const { eventId, name, marks } = req.body;
        const newCriteria = await prisma.presenterCriteria.create({
            data: {
                eventId,
                name,
                marks,
            },
        });
        res.status(201).json({
            message: "Presenter criteria created successfully",
            criteria: newCriteria,
        });
    }
    catch (error) {
        console.error("Error creating presenter criteria:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createPresenterCriteria = createPresenterCriteria;
const getPresenterCriteriaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const criteria = await prisma.presenterCriteria.findUnique({
            where: { id },
            include: {
                event: true,
            },
        });
        res.status(200).json(criteria);
    }
    catch (error) {
        console.error("Error fetching presenter criteria by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPresenterCriteriaById = getPresenterCriteriaById;
const getAllPresenterCriteria = async (req, res) => {
    try {
        const criteriaList = await prisma.presenterCriteria.findMany({
            include: {
                event: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(criteriaList);
    }
    catch (error) {
        console.error("Error fetching all presenter criteria:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllPresenterCriteria = getAllPresenterCriteria;
const updatePresenterCriteriaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, marks } = req.body ? req.body : undefined;
        const updatedCriteria = await prisma.presenterCriteria.update({
            where: { id },
            data: {
                name,
                marks,
            },
        });
        res.status(200).json({
            message: "Presenter criteria updated successfully",
            criteria: updatedCriteria,
        });
    }
    catch (error) {
        console.error("Error updating presenter criteria by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updatePresenterCriteriaById = updatePresenterCriteriaById;
const deletePresenterCriteriaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.presenterCriteria.delete({
            where: { id },
        });
        res
            .status(200)
            .json({ message: "Presenter criteria deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting presenter criteria by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deletePresenterCriteriaById = deletePresenterCriteriaById;
const deleteAllPresenterCriteria = async (req, res) => {
    try {
        await prisma.presenterCriteria.deleteMany({});
        res
            .status(200)
            .json({ message: "All presenter criteria deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all presenter criteria:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllPresenterCriteria = deleteAllPresenterCriteria;
//# sourceMappingURL=PresenterCriteria.js.map