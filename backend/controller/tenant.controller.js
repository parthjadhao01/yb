import MaintenanceRequest from "../model/maintenance.model.js";
import Request from "../model/request.model.js";

export const getApplications = async (req, res) => {
    try {
        const applications = await Request.find({ tenant: req.id });
        return res.status(200).send(applications);
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

export const postApplication = async (req, res) => {
    try {
        const { tenant, property, owner, status } = req.body;
        if (tenant && property && owner && status) {
            const request = new Request({ tenant, property, owner, status });
            const newApplication = await request.save();
            return res.status(201).send({ message: "Application created successfully", application: newApplication });
        }
        res.status(400).send("All fields are required");
    } catch (error) {
        res.status(500).send("Server Error");
    }
}
export const deleteApplication = async (req, res) => { 
    try {
        const { id } = req.params;
        const application = await Request.findOneAndDelete({ _id: id, tenant: req.id });
        if (application) {
            return res.status(200).send({ message: "Application deleted successfully" });
        }
        res.status(404).send("Application not found");
    } catch (error) {
        res.status(500).send("Server Error");   
    }
}

export const getMaintenanceRequests = async (req, res) => { 
    try {
        const requests = await MaintenanceRequest.find({ tenant : req.id }).populate('property owner status description createdAt');
        if (requests.length === 0) {
            return res.status(404).send("No maintenance requests found");
        }
        return res.status(200).send(requests);
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}
export const postMaintenanceRequest = async (req, res) => {
    try {
        const {tenant, property, owner, description} = req.body;
        if(tenant && property && owner && description){
            const request = new MaintenanceRequest({tenant, property, owner, description});
            const newRequest = await request.save();
            return res.status(201).send({message : "Maintenance request created successfully", request : newRequest});
        }
        res.status(400).send("All fields are required");
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}
export const deleteMaintenanceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await MaintenanceRequest.findOneAndDelete({ _id: id, tenant: req.id });
        if (request) {
            return res.status(200).send({ message: "Maintenance request deleted successfully" });
        }
        res.status(404).send("Maintenance request not found");
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}

export const getRentPaymentsTransactions = async (req, res) => {
    try {
        const transactions = await RentPayment.find({ tenant: req.id });
        if (transactions.length === 0) {
            return res.status(404).send("No rent payment transactions found");
        }
        return res.status(200).send(transactions);
    } catch (error) {
        return res.status(500).send("Server Error");
    }
}