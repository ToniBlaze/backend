const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Models
const tradeModel = require("../models/Trade");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const validation = require('../middlewares/Validation');
const { validateTrade } = validation;


router.post("/trades", AuthMiddleware, validateTrade, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newTrade = new tradeModel(req.body);
    res.status(201).json(await newTrade.save());
  } catch (err) {
    next(err);
  }
});


router.get("/trades", AuthMiddleware, async (req, res, next) => {
  try {
    const trades = await tradeModel.find()
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    res.status(200).json(trades);
  } catch (err) {
    next(err);
  }
});


router.get("/trades/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const trade = await tradeModel.findById(req.params.id)
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    if (!trade) {
      const error = new Error("Trade non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(trade);
  } catch (err) {
    next(err);
  }
});


router.put("/trades/:id", AuthMiddleware, validateTrade, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedTrade = await tradeModel.findByIdAndUpdate(req.params.id, req.body)
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    if (!updatedTrade) {
      const error = new Error("Trade non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedTrade);
  } catch (err) {
    next(err);
  }
});


router.delete("/trades/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const deletedTrade = await tradeModel.findByIdAndDelete(req.params.id);
    if (!deletedTrade) {
      const error = new Error("Trade non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(deletedTrade);
  } catch (err) {
    next(err);
  }
});


router.get("/trades/account/:accountId", AuthMiddleware, async (req, res, next) => {
  try {
    const trades = await tradeModel.find({ account: req.params.accountId })
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    res.status(200).json(trades);
  } catch (err) {
    next(err);
  }
});


router.get("/trades/strategy/:strategyId", AuthMiddleware, async (req, res, next) => {
  try {
    const trades = await tradeModel.find({ strategy: req.params.strategyId })
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    res.status(200).json(trades);
  } catch (err) {
    next(err);
  }
});


router.get("/trades/user/:userId", AuthMiddleware, async (req, res, next) => {
  try {
    const trades = await tradeModel.find({ author: req.params.userId })
      .populate('author','-password')
      .populate('strategy')
      .populate('account');
    res.status(200).json(trades);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
