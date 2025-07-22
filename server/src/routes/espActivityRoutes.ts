// src/routes/espActivity.routes.ts
import express from "express";
import { getLatestScan, receiveScan } from "../controllers/ESP/ESPActivityController";


const router = express.Router();

router.post("/", receiveScan);
router.get("/esp-activity", getLatestScan);

export const  EspRouter= router;
