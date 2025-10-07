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
// app.use("/api/admin", adminProtect, adminRoutes);
let users = [
  { id: "u1", name: "Rahul Mehta", email: "rahul@example.com", role: "tenant", active: true, joined: "2025-01-10" },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com", role: "landlord", active: true, joined: "2025-02-18" },
  { id: "u3", name: "Test User", email: "test@example.com", role: "tenant", active: false, joined: "2025-03-05" }
];

let properties = [
  { id: "p1", title: "2BHK Bandra West", price: 45000, owner: "Priya Sharma", status: "available", created: "2025-05-01" },
  { id: "p2", title: "3BHK Sea View", price: 85000, owner: "Priya Sharma", status: "rented", created: "2025-06-10" }
];

let maintenance = [
  { id: "m1", propertyId: "p1", tenant: "Rahul Mehta", problem: "Leaky Faucet", status: "pending", date: "2025-10-01" },
  { id: "m2", propertyId: "p2", tenant: "Test User", problem: "AC Not Cooling", status: "started", date: "2025-09-28" }
];

app.get("/api/admin/users", (req, res) => {
  res.json({ users });
});

app.put("/api/admin/users/:id/toggle", (req, res) => {
  const { id } = req.params;
  users = users.map(u => u.id === id ? { ...u, active: !u.active } : u);
  res.json({ message: "User updated", users });
});

// Properties endpoints
app.get("/api/admin/properties", (req, res) => {
  res.json({ properties });
});

app.delete("/api/admin/properties/:id", (req, res) => {
  const { id } = req.params;
  properties = properties.filter(p => p.id !== id);
  res.json({ message: "Property deleted", properties });
});

// Maintenance endpoints
app.get("/api/admin/maintenance", (req, res) => {
  res.json({ maintenance });
});

app.put("/api/admin/maintenance/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  maintenance = maintenance.map(m => m.id === id ? { ...m, status: status || m.status } : m);
  res.json({ message: "Maintenance updated", maintenance });
});

app.get("/api/admin/stats", (req, res) => {
  res.json({
    users: users.length,
    properties: properties.length,
    maintenance: maintenance.length,
    pendingMaintenance: maintenance.filter(m => m.status === "pending").length
  });
});

app.use("/api/landlord", landlordProtect, landlordRoutes);
app.use("/api/tenant", tenantProtect, tenantRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
