const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");
const validateObjectId = require("../middleware/validationMiddleware");
const auth = require("../middleware/authMiddleware");


// Create a new billing record
router.post(
  "/billing",
 
  billingController.createBilling
);


router.get("/billing", billingController.getBillingRecords);


router.get("/billing/:id",validateObjectId, billingController.getBillingRecordById);


router.put("/billing/:id/status",validateObjectId, billingController.updateBillingStatus);


router.delete("/billing/:id",validateObjectId ,billingController.deleteBillingRecord);

module.exports = router;
