// api/index.js — Vercel-ready
import express from "express";
import serverless from "serverless-http";
import { paymentMiddleware } from "x402-express";
import weatherRoutes from "../routes/weather.js";

const app = express();
app.use(express.json());

// 🔹 Persistent facilitator URL on Railway
// Replace this with your Railway HTTPS URL
const FACILITATOR_URL = "https://my-facilitator.up.railway.app/facilitator";

// 🔹 Payment middleware pointing to persistent facilitator
app.use(
  paymentMiddleware(
    "0x1234567890abcdef1234567890abcdef12345678",
    { "GET /weather": { price: "$0.0001", network: "base-sepolia" } },
    { url: FACILITATOR_URL }
  )
);

// 🔹 Mount routes
app.use("/", weatherRoutes);

// ✅ Export as serverless function — NO app.listen
export default serverless(app);
