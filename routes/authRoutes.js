const express = require("express");
const router = express.Router();
const {
  registerResident,
  loginResident,
} = require("../controllers/authController");

router.post("/register", registerResident);
router.post("/login", loginResident);

module.exports = router;
