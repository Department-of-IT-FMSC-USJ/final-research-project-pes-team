"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const EventController_1 = require("../controllers/EventController");
Router.get('/:email', EventController_1.generateSingleQRCode);
exports.qrRoutes = Router;
//# sourceMappingURL=qrRoutes.js.map