const MaintenanceRequest = require("../models/MaintenanceRequest");

exports.createRequest = async (req, res) => {
  const { residentId, issue, priority } = req.body;

  try {
    const newRequest = new MaintenanceRequest({ residentId, issue, priority });
    await newRequest.save();

    res.json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
