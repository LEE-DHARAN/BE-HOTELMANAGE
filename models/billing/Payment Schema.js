const paymentSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true }, 
  paymentStatus: { type: String, default: "Completed" }, 
});

const Payment = mongoose.model("Payment", paymentSchema);
