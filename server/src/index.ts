import express from "express";
import { eventRoute } from "./routes/eventRoutes";
import { sessionRoute } from "./routes/sessionRoutes";
import { judgeRoute } from "./routes/judgeRoutes";
import { judgeSessionRoute } from "./routes/judgeSessionRoute";
import { memberRoute } from "./routes/memberRoutes";
import { presenterRoute } from "./routes/presenterRoutes";
import { criteriaRoutes } from "./routes/criteriaRoutes";
import { qrRoutes } from "./routes/qrRoutes";
import { EspRouter } from "./routes/espActivityRoutes";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/events", eventRoute);
app.use("/sessions", sessionRoute);
app.use("/judges", judgeRoute);
app.use("/sessionjudges", judgeSessionRoute);
app.use("/members", memberRoute);
app.use("/presenters", presenterRoute);
app.use("/criteria", criteriaRoutes);
app.use("/generate-qr", qrRoutes);
app.use("/esp", EspRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
