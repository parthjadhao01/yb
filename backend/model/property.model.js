import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  address: { type: String, required: true },
  socityName :{ type : String, required : true},
  BHK : {type : Number, required : true},
  area : {type : Number, required : true},
  furnishingStatus : {type : String, required : true},
  amenities : {type : [String], required : true},
  description : {type : String, required : true},
  images : {type : [String], required : true},
  availabilityStatus : {type : Boolean, required : true},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
  rent: { type: Number, required: true },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
