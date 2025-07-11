const express = require("express");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const Booking = require("../models/Bookings");

// ✅ Route 1: Test Razorpay Order Creation
router.get("/test-razorpay", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 50000, // ₹500 in paise
      currency: "INR",
      receipt: "test_receipt_123"
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Razorpay test failed", error: err });
  }
});

// ✅ Route 2: Test Booking Model Save to DB
router.post("/create-test-booking", async (req, res) => {
  try {
    const newBooking = new Booking({
      listingId: "64f1de0c4f3a21c8ae920b88",     // Replace with real Listing _id
      travelerId: "64f1de0c4f3a21c8ae920b89",    // Replace with real User _id
      dates: ["2025-07-15", "2025-07-16"],
      amountPaid: 500,
      paymentStatus: "pending",
      razorpayOrderId: "order_test123"
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking saved", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ message: "Failed to save booking", error: err });
  }
});

module.exports = router;
