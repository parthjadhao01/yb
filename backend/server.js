import express from "express";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import landlordRoutes from "./routes/landlord.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import { tenantProtect, landlordProtect, adminProtect } from "./middleware/auth.middleware.js";
import cors from "cors";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDb();

const app = express();

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminProtect, adminRoutes);
app.use("/api/landlord", landlordProtect, landlordRoutes);
app.use("/api/tenant", tenantProtect, tenantRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
