"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventRoutes_1 = require("./routes/eventRoutes");
const sessionRoutes_1 = require("./routes/sessionRoutes");
const judgeRoutes_1 = require("./routes/judgeRoutes");
const judgeSessionRoute_1 = require("./routes/judgeSessionRoute");
const memberRoutes_1 = require("./routes/memberRoutes");
const presenterRoutes_1 = require("./routes/presenterRoutes");
const criteriaRoutes_1 = require("./routes/criteriaRoutes");
const qrRoutes_1 = require("./routes/qrRoutes");
const espActivityRoutes_1 = require("./routes/espActivityRoutes");
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));
app.use("/events", eventRoutes_1.eventRoute);
app.use("/sessions", sessionRoutes_1.sessionRoute);
app.use("/judges", judgeRoutes_1.judgeRoute);
app.use("/sessionjudges", judgeSessionRoute_1.judgeSessionRoute);
app.use("/members", memberRoutes_1.memberRoute);
app.use("/presenters", presenterRoutes_1.presenterRoute);
app.use("/criteria", criteriaRoutes_1.criteriaRoutes);
app.use("/generate-qr", qrRoutes_1.qrRoutes);
app.use("/esp", espActivityRoutes_1.EspRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map