"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspRouter = void 0;
// src/routes/espActivity.routes.ts
const express_1 = __importDefault(require("express"));
const ESPActivityController_1 = require("../controllers/ESP/ESPActivityController");
const router = express_1.default.Router();
router.post("/", ESPActivityController_1.receiveScan);
router.get("/esp-activity", ESPActivityController_1.getLatestScan);
exports.EspRouter = router;
//# sourceMappingURL=espActivityRoutes.js.map