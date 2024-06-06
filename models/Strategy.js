const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  assetCategory: {
    type: String,
    required: true
  },
  timeframe: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  setup: {
    type: String
  },
  trigger: {
    type: String
  },
  tradeManagement: {
    type: String
  }
});

const strategyModel = mongoose.model('Strategy', strategySchema);

module.exports = strategyModel;
