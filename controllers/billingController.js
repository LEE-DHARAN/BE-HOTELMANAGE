const Billing = require("../models/billing");
const Room = require("../models/room"); // To check room status or calculate billing for specific rooms

// Create a new billing record
exports.createBilling = async (req, res) => {
  const { residentId, roomId, amount, dueDate } = req.body;

  // Validate required fields
  if (!residentId || !roomId || !amount || !dueDate) {
    return res
      .status(400)
      .json({ msg: "Resident ID, Room ID, Amount, and Due Date are required" });
  }

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Create a new billing record
    const billingRecord = new Billing({
      residentId,
      roomId,
      amount,
      dueDate,
      status: "Pending", // Default status is 'Pending'
    });

    // Save the billing record
    await billingRecord.save();

    // Return the created billing record
    res.status(201).json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get all billing records (can filter by status if needed)
exports.getBillingRecords = async (req, res) => {
  const { status } = req.query; // Optional query parameter for filtering by status

  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const billingRecords = await Billing.find(filter).populate("roomId"); // Populate room data

    // If no billing records found
    if (billingRecords.length === 0) {
      return res.status(404).json({ msg: "No billing records found" });
    }

    // Return the list of billing records
    res.json(billingRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a specific billing record by ID
exports.getBillingRecordById = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id).populate(
      "roomId"
    );

    // Check if the billing record exists
    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    // Return the billing record data
    res.json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update a billing record status (e.g., from 'Pending' to 'Paid')
exports.updateBillingStatus = async (req, res) => {
  const { status } = req.body;

  // Validate status field
  if (!status || !["Pending", "Paid", "Overdue"].includes(status)) {
    return res
      .status(400)
      .json({ msg: "Status must be one of: 'Pending', 'Paid', or 'Overdue'" });
  }

  try {
    // Find the billing record by ID
    const billingRecord = await Billing.findById(req.params.id);

    // Check if the billing record exists
    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    // Update the billing record status
    billingRecord.status = status;

    // Save the updated billing record
    await billingRecord.save();

    // Return the updated billing record
    res.json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a billing record
exports.deleteBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    // Check if the billing record exists
    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    // Delete the billing record from the database
    await billingRecord.remove();

    // Return a success message
    res.json({ msg: "Billing record deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
