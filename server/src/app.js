import express from "express";
import cors from "cors";
import voiceRoutes from "./routes/voice.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/voice", voiceRoutes);

export default app;