require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const app = express();
const bookingRoutes = require("./routes/bookingRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

// Routes (sample)
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

// Export app
module.exports = app;
