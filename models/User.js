const mongoose = require("mongoose");

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  trades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade",
    },
  ],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  strategies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Strategy",
    },
  ],
});

// Mongoose Model
const userModel = mongoose.model("User", userSchema);

// Export Module
module.exports = userModel;
