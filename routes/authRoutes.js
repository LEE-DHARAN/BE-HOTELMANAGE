/*const express = require("express");
const router = express.Router();
const {
  registerResident,
  loginResident,logoutResident
} = require("../controllers/authController");

//const authController = require("../controllers/authController");

router.post("/register", registerResident);
router.post("/login", loginResident);
router.post("/logout",logoutResident)
module.exports = router;*/


const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
module.exports = router;