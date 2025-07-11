const express = require("express");
const router = express.Router();
const {
  createBookingOrder,
  verifyPayment
} = require("../controllers/bookingController");

// POST /api/bookings/create-order
router.post("/create-order", createBookingOrder);

// POST /api/bookings/verify-payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
