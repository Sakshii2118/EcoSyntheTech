const Razorpay = require("razorpay");

// Initialize Razorpay instance using your API keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,     // from your .env file
  key_secret: process.env.RAZORPAY_SECRET  // from your .env file
});

module.exports = razorpay;
console.log("Hello World!")
console.log(process.env.RAZORPAY_KEY_ID)