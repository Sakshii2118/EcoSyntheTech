const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing", // assumes Listing model exists
    required: true
  },
  travelerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assumes User model exists
    required: true
  },
  dates: {
    type: [String], // Or you can use [{ from: String, to: String }]
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  razorpayOrderId: String,
  razorpayPaymentId: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
