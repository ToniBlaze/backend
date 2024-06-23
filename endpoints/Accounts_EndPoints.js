const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Models
const accountModel = require("../models/Account");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const { validateAccount } = require("../middlewares/validators");


router.post("/accounts", AuthMiddleware, validateAccount, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newAccount = new accountModel(req.body);
    res.status(201).json(await newAccount.save());
  } catch (err) {
    next(err);
  }
});


router.get("/accounts", AuthMiddleware, async (req, res, next) => {
  try {
    const accounts = await accountModel.find().populate("user", "-password");
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});


router.get("/accounts/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const account = await accountModel.findById(req.params.id).populate("user", "-password");
    if (!account) {
      const error = new Error("Conto non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});


router.put("/accounts/:id", AuthMiddleware, validateAccount, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedAccount = await accountModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedAccount) {
      const error = new Error("Conto non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
});


router.delete("/accounts/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const deletedAccount = await accountModel.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      const error = new Error("Conto non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(deletedAccount);
  } catch (err) {
    next(err);
  }
});


router.get("/accounts/user/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const accounts = await accountModel.find({ user: req.params.id }).populate("user", "-password");
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;