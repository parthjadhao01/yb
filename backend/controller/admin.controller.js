import Admin from "../model/admin.model.js";
import Tenant from "../model/tenant.model.js";
import Landlord from "../model/landlord.model.js";
import bcrypt from "bcryptjs";
import generateJWTToken from "../utils/generateJWT.js";

const adminRegister = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        if (email && password && userType === 'admin') {
            const emailExists = await Admin.findOne({ email });
            if (emailExists) {
                return res.status(400).send("Email already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({ email, password: hashedPassword, name, phone });
            await newAdmin.save();
            return res.status(201).send({ message: "Admin registered", token: generateJWTToken(newAdmin._id) });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(400).send("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).send("Invalid credentials");
    }
    res.send({ message: "Admin logged in", token: generateJWTToken(admin._id) });
}

const tenantRegister = async (req, res) => {
    try {
        const { email, password, name, phone, userType } = req.body;
        if (email && password && name && phone && userType === 'tenant') {
            const emailExists = await Tenant.findOne({ email });
            if (emailExists) {
                return res.status(400).send("Email already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newTenant = new Tenant({ email, password: hashedPassword, name, phone });
            await newTenant.save();
            return res.status(201).send({ message: "Tenant registered", token: generateJWTToken(newTenant._id) });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}
const tenantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).send("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, tenant.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials");
    }
    res.send({ message: "Tenant logged in", token: generateJWTToken(tenant._id) });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};


const landlordRegister = async (req, res) => {
    try {
        const { email, password, name, phone, userType } = req.body;
        if (email && password && name && phone && userType === 'landlord') {
            const emailExists = await Landlord.findOne({ email });
            if (emailExists) {
                return res.status(400).send("Email already exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newLandlord = new Landlord({ email, password: hashedPassword, name, phone });
            await newLandlord.save();
            return res.status(201).send({ message: "Landlord registered", token: generateJWTToken(newLandlord._id) });
        }
        res.send("Landlord registered");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}
const landlordLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const landlord = await Landlord.findOne({ email });
        if (!landlord) {
            return res.status(400).send("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, landlord.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }
        res.send("Landlord logged in");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}

export { adminRegister, adminLogin, tenantRegister, tenantLogin, landlordRegister, landlordLogin };