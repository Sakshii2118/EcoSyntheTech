const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookingDates: [Date],
  paymentStatus: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
