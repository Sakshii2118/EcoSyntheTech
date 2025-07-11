const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { listingId, bookingDates } = req.body;

    // No authentication yet → using dummy travelerId for testing
    const travelerId = '64dccc1234567890abcdef12'; // Dummy ObjectId (you can replace later)

    const booking = new Booking({ listingId, travelerId, bookingDates });
    await booking.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('listingId');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
