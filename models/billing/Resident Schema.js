const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalCharges: { type: Number, default: 0 }, // Total charges
});

const Resident = mongoose.model("Resident", residentSchema);
