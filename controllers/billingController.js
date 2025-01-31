const Billing = require("../models/billing");
const Room = require("../models/room");

exports.createBilling = async (req, res) => {
  const { residentId, roomId, amount, dueDate } = req.body;

  
  if (!residentId || !roomId || !amount || !dueDate) {
    return res
      .status(400)
      .json({ msg: "Resident ID, Room ID, Amount, and Due Date are required" });
  }

  try {
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    
    const billingRecord = new Billing({
      residentId,
      roomId,
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
