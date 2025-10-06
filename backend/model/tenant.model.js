import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name : {type : String, required : true},
  phone : {type : String, required : true},
  maintenanceRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceRequest' }],
  rentRequest : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;