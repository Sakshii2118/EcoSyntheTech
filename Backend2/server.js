require("dotenv").config(); // Load variables from .env
const app = require("./app");
const connectDB = require("./config/db");

connectDB(); // connect to DB before starting server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
