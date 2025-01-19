const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");

// Create a new billing record
router.post("/billing", billingController.createBilling);

// Get all billing records (can filter by status)
router.get("/billing", billingController.getBillingRecords);

// Get a specific billing record by ID
router.get("/billing/:id", billingController.getBillingRecordById);

// Update the status of a billing record
router.put("/billing/:id/status", billingController.updateBillingStatus);

// Delete a billing record
router.delete("/billing/:id", billingController.deleteBillingRecord);

module.exports = router;
