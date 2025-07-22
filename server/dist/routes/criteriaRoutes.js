"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criteriaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PresenterCriteria_1 = require("../controllers/PresenterCriteria");
const router = express_1.default.Router();
router.post("/", PresenterCriteria_1.createPresenterCriteria);
router.get("/:id", PresenterCriteria_1.getPresenterCriteriaById);
router.get("/", PresenterCriteria_1.getAllPresenterCriteria);
router.patch("/:id", PresenterCriteria_1.updatePresenterCriteriaById);
router.delete("/", PresenterCriteria_1.deleteAllPresenterCriteria);
router.delete("/:id", PresenterCriteria_1.deletePresenterCriteriaById);
exports.criteriaRoutes = router;
//# sourceMappingURL=criteriaRoutes.js.map