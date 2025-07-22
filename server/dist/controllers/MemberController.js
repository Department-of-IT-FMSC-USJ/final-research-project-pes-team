"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllMembers = exports.deleteMemberById = exports.updateMemberById = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const client_1 = require("@prisma/client");
const generate_password_1 = __importDefault(require("generate-password"));
const prisma = new client_1.PrismaClient();
const createMember = async (req, res) => {
    try {
        // Generate a random member ID
        const generateRandomMemberId = generate_password_1.default.generate({
            length: 6,
            numbers: true,
            symbols: false,
            uppercase: true,
            lowercase: false,
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
    }
    catch (error) {
        console.error("Error creating member:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createMember = createMember;
const getAllMembers = async (req, res) => {
    try {
        const members = await prisma.members.findMany({
            include: {
                presenters: true,
            },
        });
        res.status(200).json(members);
    }
    catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllMembers = getAllMembers;
const getMemberById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const member = await prisma.members.findUnique({
            where: { id },
            include: {
                presenters: true,
            },
        });
        res.status(200).json(member);
    }
    catch (error) {
        console.error("Error fetching member by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getMemberById = getMemberById;
const updateMemberById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, email, phone, marks, isLeader } = req.body;
        const member = await prisma.members.update({
            where: { id },
            data: {
                name: name ? name : undefined,
                email: email ? email : undefined,
                phone: phone ? phone : undefined,
                marks: marks ? marks : undefined,
                isLeader: isLeader ? isLeader : undefined,
            },
        });
        res.status(200).json({
            message: "Member updated successfully",
            member,
        });
    }
    catch (error) {
        console.error("Error updating member by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateMemberById = updateMemberById;
const deleteMemberById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await prisma.members.delete({
            where: { id },
        });
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting member by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteMemberById = deleteMemberById;
const deleteAllMembers = async (req, res) => {
    try {
        await prisma.members.deleteMany();
        res.status(200).json({ message: "All members deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting all members:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteAllMembers = deleteAllMembers;
//# sourceMappingURL=MemberController.js.map