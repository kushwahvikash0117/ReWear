import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import swapRoutes from './routes/swapRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import axios from "axios";
import clipRoutes from "./routes/clipRoutes.js";


const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: ["https://rewear-alpha.vercel.app", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/clip", clipRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use(errorHandler);



// Load .env only if it exists locally (ignore on Render)
try {
  dotenv.config({ path: path.join(__dirname, "../.env") });
  console.log("✅ .env variables loaded");
} catch (err) {
  console.warn("⚠️  Skipping local .env load (Render will use dashboard vars)");
}
connectDB();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
