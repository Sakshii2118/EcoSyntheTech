const Razorpay = require("razorpay");
const Booking = require("../models/Bookings");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// POST /api/bookings/create-order
const createBookingOrder = async (req, res) => {
  try {
    const { listingId, travelerId, dates, amount } = req.body;

    // 1. Create a Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // 2. Save a pending booking record in DB
    const newBooking = new Booking({
      listingId,
      travelerId,
      dates,
      amountPaid: amount,
      paymentStatus: "pending",
      razorpayOrderId: order.id
    });

    await newBooking.save();

    // 3. Send response to frontend
    res.status(201).json({
      message: "Razorpay order created & booking saved",
      orderId: order.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      bookingId: newBooking._id
    });
  } catch (error) {
    console.error("Failed to create booking order:", error);
    res.status(500).json({ message: "Failed to create Razorpay order", error });
  }
};

module.exports = {
  createBookingOrder
};

// POST /api/bookings/verify-payment
const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  try {
    // 1. Generate expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    // 2. Compare signatures
    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 3. Update booking status to 'paid'
    const updatedBooking = await Booking.findOneAndUpdate(
      { razorpayOrderId: orderId },
      {
        paymentStatus: "paid",
        razorpayPaymentId: paymentId
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Payment verified", booking: updatedBooking });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Payment verification failed", error });
  }
};

module.exports = {
  createBookingOrder,
  verifyPayment
};


