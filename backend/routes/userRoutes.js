const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");


// New: Registration Route //public
router.get("/", userController.getUsers);
router.post("/register", userController.registerUser);

// Existing: Fetch users
// router.get("/", userController.getUsers);

// Protected route (officials only)
router.get("/admin-only", verifyToken, authorizeRoles("hod", "gm", "director"), (req, res) => {
  res.json({ message: "Hello Admin", user: req.user });
});

module.exports = router;