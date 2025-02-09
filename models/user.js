// models/user.js

/*const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "resident"],
    default: "resident",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;*/


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  password: String,
    contactNumber:String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema, 'users'); // model name, schema, collection name