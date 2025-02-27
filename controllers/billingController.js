const Billing = require("../models/billing.js");
const Rooms = require("../models/room.js");

exports.createBilling = async (req, res) => {
  const { email, roomNumber, amount, dueDate } = req.body;

  if (!email || !roomNumber || !amount || !dueDate) {
    return res.status(400).json({ msg: "Email, Room Number, Amount, and Due Date are required" });
  }

  try {
    // Find the resident by email
    const resident = await Residents.findOne({ email });
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Find the room by roomNumber
    const room = await Rooms.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Create the billing record
    const billingRecord = new Billing({
      residentId: resident._id,
      roomId: room._id,
      amount,
      dueDate,
      status: "Pending",
    });

    await billingRecord.save();

    res.status(201).json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.getBillingRecords = async (req, res) => {
  const { status } = req.query;

  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const billingRecords = await Billing.find(filter).populate("roomId");

    if (billingRecords.length === 0) {
      return res.status(404).json({ msg: "No billing records found" });
    }

    res.json(billingRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getBillingRecordById = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id).populate(
      "roomId"
    );

    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    res.json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.updateBillingStatus = async (req, res) => {
  const { status } = req.body;

  if (!status || !["Pending", "Paid", "Overdue"].includes(status)) {
    return res
      .status(400)
      .json({ msg: "Status must be one of: 'Pending', 'Paid', or 'Overdue'" });
  }

  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    billingRecord.status = status;

    await billingRecord.save();

    res.json(billingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.deleteBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ msg: "Billing record not found" });
    }

    await billingRecord.remove();

    res.json({ msg: "Billing record deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getBillingRecordByEmail = async (req, res) => {
  const { email } = req.params; // Get email from request parameters

  try {
    // Find the resident by email
    const resident = await Residents.findOne({ email });
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Find the room assigned to the resident
    const room = await Rooms.findOne({ residentId: resident._id });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Fetch billing records associated with the room
    const billingRecords = await Billing.find({ roomId: room._id }).populate("roomId");

    if (billingRecords.length === 0) {
      return res.status(404).json({ msg: "No billing records found" });
    }

    res.json(billingRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

