const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Models
const userModel = require("./models/User");
const strategyModel = require("./models/Strategy");
const accountModel = require("./models/Account");
const tradeModel = require("./models/Trade");




// Endpoints Authorization
const AuthEndpoints = require("./endpoints/Auth");
app.use(AuthEndpoints);


// EndPoints Users
const endPointsUsers = require("./endpoints/Users_EndPoints");
app.use(endPointsUsers);

// EndPoints Accounts
const endPointsAccounts = require("./endpoints/Accounts_EndPoints");
app.use(endPointsAccounts);

// EndPoints Strategies
const endPointsStrategies = require("./endpoints/Strategies_EndPoints");
app.use(endPointsStrategies);

// EndPoints Trades
const endPointsTrades = require("./endpoints/Trades_EndPoints");
app.use(endPointsTrades);




// Middleware ErrorHandler
const debug = require("./middlewares/debug");
app.use(debug.errorHandler);

mongoose
  .connect(process.env.MONGODB_APIKEY)
  .then((response) => {
    console.log("DB Connected...");
    app.listen(process.env.PORT, async () =>
      console.log("Server listening on port " + process.env.PORT)
    );
  })
  .catch((err) => console.error(err));