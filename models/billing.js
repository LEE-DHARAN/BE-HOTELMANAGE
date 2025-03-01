const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Billing Schema
const BillingSchema = new Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Residents", 
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms", 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"], 
      default: "Pending",
    },
  },
  { timestamps: true } 
);


module.exports = mongoose.model("Billing", BillingSchema,'Billing');
