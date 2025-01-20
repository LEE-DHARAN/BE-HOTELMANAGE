const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Resident = require("../models/Resident");
const { JWT_SECRET } = require("../utils/config");

exports.registerResident = async (req, res) => {
  const { name, email, password, contactNumber, emergencyContact } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newResident = new Resident({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      emergencyContact,
    });
    await newResident.save();

    const token = jwt.sign({ id: newResident._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.loginResident = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resident = await Resident.findOne({ email });
    if (!resident) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, resident.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: resident._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.logoutResident = async (req, res) => {
  try {
    // clear the token from the cookie
    // res.clearCookie('token');

    res.header(
      "Set-Cookie",
      "token=; HttpOnly; Secure; SameSite=None; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    // return a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
