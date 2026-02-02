import express from "express";
import { Facilitator, createExpressAdapter } from "x402-open";
import { baseSepolia } from "viem/chains";
import { paymentMiddleware } from "x402-express";
import weatherRoutes from './routes/weather.js'; // correct path

const app = express();
app.use(express.json());

// Facilitator node
const facilitator = new Facilitator({
  evmPrivateKey: process.env.PRIVATE_KEY,
  evmNetworks: [baseSepolia],
});

createExpressAdapter(facilitator, app, "/facilitator");

// Payment middleware
app.use(
  paymentMiddleware(
    "0x1234567890abcdef1234567890abcdef12345678",
    { "GET /weather": { price: "$0.0001", network: "base-sepolia" } },
    { url: "http://localhost:4021/facilitator" }
  )
);

// Mount routes
app.use("/", weatherRoutes);

const PORT = process.env.PORT || 4021;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
