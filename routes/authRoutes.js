const express = require("express");
const router = express.Router();
const {
  registerResident,
  loginResident,logoutResident
} = require("../controllers/authController");

router.post("/register", registerResident);
router.post("/login", loginResident);
router.post("/logout",logoutResident)
module.exports = router;
