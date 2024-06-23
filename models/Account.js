const mongoose = require("mongoose");

// Account schema
const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
