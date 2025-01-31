const paymentSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true }, // e.g., 'Stripe', 'PayPal'
  paymentStatus: { type: String, default: "Completed" }, // e.g., 'Completed', 'Pending', 'Failed'
});

const Payment = mongoose.model("Payment", paymentSchema);
