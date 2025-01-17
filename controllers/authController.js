const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Resident = require("../models/Resident");

exports.registerResident = async (req, res) => {
  const { name, email, password, contactNumber, emergencyContact } = req.body;

  try {
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

    const token = jwt.sign({ id: newResident._id }, process.env.JWT_SECRET, {
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
