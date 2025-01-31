app.post("/api/generate-charges", async (req, res) => {
  const { residentId, roomFee, utilitiesFee, additionalServices } = req.body;

  const total = roomFee + utilitiesFee + additionalServices;

  // Save charges to RoomCharge
  const roomCharge = new RoomCharge({
    residentId,
    roomFee,
    utilitiesFee,
    additionalServices,
    total,
  });

  await roomCharge.save();

  // Update total charges in Resident
  await Resident.findByIdAndUpdate(residentId, { totalCharges: total });

  res
    .status(200)
    .json({ message: "Room charges generated successfully", roomCharge });
});




app.post("/api/generate-invoice", async (req, res) => {
  const { residentId, charges, discount, lateFee } = req.body;

  const discountAmount = (charges * discount) / 100;
  const totalAmount = charges - discountAmount + lateFee;

  // Create invoice
  const invoice = new Invoice({
    residentId,
    charges,
    discount: discountAmount,
    lateFee,
    totalAmount,
  });

  await invoice.save();

  res.status(200).json({ message: "Invoice generated successfully", invoice });
});




app.post("/api/process-payment", async (req, res) => {
  const { residentId, amount, paymentMethod } = req.body;

  // Process payment (use Stripe or PayPal SDK to charge the resident)
  try {
    const payment = new Payment({
      residentId,
      amount,
      paymentMethod,
      paymentStatus: "Completed",
    });

    await payment.save();

    // Update Invoice status to 'Paid'
    await Invoice.findOneAndUpdate(
      { residentId, status: "Pending" },
      { status: "Paid" }
    );

    res
      .status(200)
      .json({ message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
});





app.get("/api/payment-history/:residentId", async (req, res) => {
  const { residentId } = req.params;

  const payments = await Payment.find({ residentId }).sort({ paymentDate: -1 });

  res.status(200).json({ payments });
});
