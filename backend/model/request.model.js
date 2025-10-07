import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    owner : { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    requestedAt: { type: Date, default: Date.now }
})

const Request = mongoose.model("Request", requestSchema)
export default Request