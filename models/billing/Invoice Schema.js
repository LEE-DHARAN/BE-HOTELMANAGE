const invoiceSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  charges: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  lateFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // e.g., 'Pending', 'Paid'
  invoiceDate: { type: Date, default: Date.now },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
