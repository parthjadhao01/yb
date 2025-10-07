import express from "express";
import { postProperty,getProperties,deleteProperty,updateProperty,getTenantsApplications,updateApplicationStatus,getMaintenanceRequests,updateMaintenanceStatus,landlordProfile,updateLandlordProfile } from "../controller/landlord.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { landlordProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

// all routes for geting landlord profile details
router.get("/profile",landlordProfile)
router.put("/profile",updateLandlordProfile)

// all property routes here
router.post("/postProperty", landlordProtect, upload.array("images"), postProperty);
router.get("/getProperties",getProperties)
router.delete("/deleteProperty/:id",deleteProperty)
router.put("/updateProperty/:id",updateProperty)

// all tenant application routes here
router.get("/getTenantsApplications",getTenantsApplications)
router.put("/updateApplicationStatus/:id",updateApplicationStatus)

// all maintenance request routes here
router.get("/getMaintenanceRequests",getMaintenanceRequests)
router.put("/updateMaintenanceStatus/:id",updateMaintenanceStatus)

// all rent managment routes here
// router.get("/getTransactionDetail",getPayments)
// router.put("/updateTransactionStatus/:id",updatePaymentStatus)
export default router;