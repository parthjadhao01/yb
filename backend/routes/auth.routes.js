import express from "express";
import { adminRegister, adminLogin, landlordRegister, landlordLogin, tenantRegister, tenantLogin } from "../controller/admin.controller.js";

const router = express.Router();

router.post("/register/admin",adminRegister)
router.post("/login/admin",adminLogin)
router.post("/register/landlord",landlordRegister)
router.post("/login/landlord",landlordLogin)
router.post("/register/tenant",tenantRegister)
router.post("/login/tenant",tenantLogin)


export default router;

