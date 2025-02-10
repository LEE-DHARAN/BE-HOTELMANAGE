/*const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Resident = require("../models/resident");
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

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
  
      contactNumber,
      emergencyContact,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};*/

/*const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Resident = require("../models/resident");
const { JWT_SECRET } = require("../utils/config");

exports.registerResident = async (req, res) => {
  const { name, email, password, contactNumber, emergencyContact } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the email already exists in the User collection
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    const newUser = new User({
      username: name, // Use the name as the username if needed
      email,
      password: hashedPassword,
      role: "resident", // default role
    });

    await newUser.save();

    // Create a new Resident document
    const newResident = new Resident({
      name,
      email,
      contact: contactNumber,
      emergencyContact,
      roomId: null, // Set this to `null` or a valid room ID if applicable
    });

    await newResident.save();

    // Create a JWT token for the User
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.loginResident = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
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
};*/

const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config.js");

const authController = {
  register: async (request, response) => {
    try {
      // Get user input
      const { name, email, password, contactNumber } = request.body;

      // check if user with the same email exists
      const user = await User.findOne({ email });

      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      // create user object
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        contactNumber,
        role: "user",
      });

      // save user
      await newUser.save();

      // send a response
      response.json({ message: "User registered successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  login: async (request, response) => {
    try {
      // get the email and password from request body
      const { email, password } = request.body;

      // check if user exists
      const user = await User.findOne({ email });

      // if the user does not exist, return an error message
      if (!user) {
        return response.status(400).json({ message: "User does not exist" });
      }

      // compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      // if the password does not match, return an error message
      if (!isMatch) {
        return response.status(400).json({ message: "Invalid credentials" });
      }

      // generate a token
      const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // set the token in the response cookies
      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      // send a response
      response.json({ message: "User logged in successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      // clear the token from the cookies
      response.clearCookie("token");

      // send a response
      response.json({ message: "User logged out successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  me: async (request, response) => {
    try {
      // get the user id from the request object
      const userId = request.userId;

      // find the user
      const user = await User.findById(userId).select(
        "-password -__v -created_at -updated_at"
      );

      // send the user object
      response.json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
