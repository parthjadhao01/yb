import mongoose from "mongoose";

const maintenancceRequestSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenancceRequestSchema);

export default MaintenanceRequest;