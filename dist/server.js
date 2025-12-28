import "./loadEnv.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./utils/db.js";
import { recipeRouter } from "./routes/recipeRoutes.js";
// recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// connect to DB
connectDB().catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
});
// Body parsers (support large payloads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// API routes
app.use("/api/recipes", recipeRouter);
// STATIC FRONTEND
const frontendDist = path.join(__dirname, "frontend");
app.use(express.static(frontendDist));
app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
});
// start server
const PORT = Number(process.env.PORT ?? 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
