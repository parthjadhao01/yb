import express from "express";

import { getApplications, postApplication, deleteApplication, tenantProfile, updateTenantProfile } from "../controller/tenant.controller.js";
import { getMaintenanceRequests, postMaintenanceRequest, deleteMaintenanceRequest } from "../controller/tenant.controller.js";
import { getRentPaymentsTransactions } from "../controller/tenant.controller.js";

const router = express.Router();

// all tenant application requet routes here
// todo : create application models
router.get("/profile",tenantProfile);
router.put("/profile",updateTenantProfile)

router.get("/getApplications", getApplications);
router.post("/postApplication", postApplication);
router.delete("/deleteApplication/:id", deleteApplication);

// all tenat maintenace request routes here
router.get("/getMaintenanceRequests", getMaintenanceRequests);
router.post("/postMaintenanceRequest", postMaintenanceRequest);
router.delete("/deleteMaintenanceRequest/:id", deleteMaintenanceRequest);

// all rent payment routes
// todo : create rent payment models
// router.get("/getRentPaymentsTransactions", getRentPaymentsTransactions);
export default router;
