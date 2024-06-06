const mongoose = require("mongoose");

// Trade schema
const tradeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  strategy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Strategy",
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },
  asset: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  entryPrice: {
    type: Number,
    required: true
  },
  closePrice: {
    type: Number
  },
  isClosed: {
    type: Boolean,
    default: false,
    required: true
  },
  comment: [{
    date: {
      type: Date,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }]
});

// Mongoose Model
const tradeModel = mongoose.model("Trade", tradeSchema);

// Export Module
module.exports = tradeModel;