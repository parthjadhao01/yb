import mongoose from "mongoose";

const landlordSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const Landlord = mongoose.model("Landlord", landlordSchema);

export default Landlord;
