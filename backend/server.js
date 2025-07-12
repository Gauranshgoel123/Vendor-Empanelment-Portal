const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 Add this line before your routes
app.use(express.json());

// Enable CORS (important for frontend integration)
app.use(cors());

// Import routes
const userRoutes = require("./routes/userRoutes");

// Register routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
