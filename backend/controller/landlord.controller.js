import MaintenanceRequest from "../model/maintenance.model.js";
import Request from "../model/request.model.js";
import Landlord from "../model/landlord.model.js";

// controller/landlord.controller.js
import Property from "../model/property.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


export const landlordProfile = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const landlord = await Landlord.findById(landlordId).select('-password');
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    return res.status(200).json({ landlord });
  } catch (error) {
    console.error("Error fetching landlord profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateLandlordProfile = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const updates = req.body;
    const landlord = await Landlord.findByIdAndUpdate(landlordId, updates, { new: true }).select('-password');
    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }
    return res.status(200).json({ message: "Profile updated successfully", landlord });
  } catch (error) {
    console.error("Error updating landlord profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const postProperty = async (req, res) => {
  try {
    console.log("Incoming property form:", req.body);
    console.log("Incoming files:", req.files);

    const {
      address,
      socityName,
      BHK,
      area,
      furnishingStatus,
      amenities,
      description,
      availabilityStatus,
      rent,
    } = req.body;

    if (
      !address ||
      !socityName ||
      !BHK ||
      !area ||
      !furnishingStatus ||
      !description ||
      !availabilityStatus ||
      !rent
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse amenities if sent as JSON string
    const parsedAmenities = amenities ? JSON.parse(amenities) : [];

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "properties" },
          (error, uploaded) => {
            if (error) throw error;
            imageUrls.push(uploaded.secure_url);
          }
        );
      }
    }

    // Wait for all uploads to finish
    const uploadedImages = await Promise.all(
      req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "properties" }, (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              })
              .end(file.buffer);
          })
      )
    );

    const newProperty = new Property({
      address,
      socityName,
      BHK,
      area,
      furnishingStatus,
      amenities: parsedAmenities,
      description,
      availabilityStatus,
      rent,
      images: uploadedImages,
      owner: req.user._id, // assuming landlordProtect adds this
    });

    await newProperty.save();

    return res
      .status(201)
      .json({ message: "Property posted successfully!", property: newProperty });
  } catch (error) {
    console.error("Error posting property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user._id });
        return res.status(200).send({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findOneAndDelete({ _id: id});
        if (property) {
            return res.status(200).send({ message: "Property deleted successfully" });
        }
        res.status(404).send("Property not found");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const updateProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const updates = req.body;
        const property = await Property.findOneAndUpdate({ _id: propertyId, owner: req.user._id }, updates, { new: true });
        if (property) {
            return res.status(200).send({ message: "Property updated successfully", property });
        }
        res.status(404).send("Property not found");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getTenantsApplications = async (req, res) => {
    try {
        const applications = await Request.find({owner : req.user._id})
        return res.status(200).send({applications})
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const application = await Request.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { status },
            { new: true }
        );
        if (application) {
            return res.status(200).send({ message: "Application status updated successfully", application });
        }
        res.status(404).send("Application not found");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export  const getMaintenanceRequests = async (req, res) => {
    try {
        const requests = await MaintenanceRequest.find({owner : req.user._id}).populate('tenant property');
        return res.status(200).send({ requests });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export const updateMaintenanceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const request = await MaintenanceRequest.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { status },
            { new: true }
        );
        if (request) {
            return res.status(200).send({ message: "Maintenance request status updated successfully", request });
        }
        res.status(404).send("Maintenance request not found");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// Note : this can only integrated after integrating payment gateway
const getPayments = async (req, res) => {};
const updatePaymentStatus = async (req, res) => {};