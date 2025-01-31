const roomChargeSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  roomFee: { type: Number, required: true },
  utilitiesFee: { type: Number, default: 0 },
  additionalServices: { type: Number, default: 0 },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RoomCharge = mongoose.model("RoomCharge", roomChargeSchema);
