const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 Add this line before your routes
app.use(express.json());

// Enable CORS (important for frontend integration)
app.use(cors());

// Import and register routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
