"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestScan = exports.receiveScan = void 0;
let latestScan = null;
const receiveScan = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error processing scan:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.receiveScan = receiveScan;
// get /api/esp-activity/latest
const getLatestScan = async (_req, res) => {
    if (!latestScan) {
        return res.status(200).json({ message: "No scan found" });
    }
    return res.status(200).json(latestScan);
};
exports.getLatestScan = getLatestScan;
//# sourceMappingURL=ESPActivityController.js.map