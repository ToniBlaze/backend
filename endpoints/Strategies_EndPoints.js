const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Models
const strategyModel = require("../models/Strategy");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const validation = require('../middlewares/Validation');
const { validateStrategy } = validation;


router.post("/strategies", AuthMiddleware, validateStrategy, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newStrategy = new strategyModel(req.body);
    res.status(201).json(await newStrategy.save());
  } catch (err) {
    next(err);
  }
});


router.get("/strategies", AuthMiddleware, async (req, res, next) => {
  try {
    const strategies = await strategyModel.find().populate("user", "-password");
    res.status(200).json(strategies);
  } catch (err) {
    next(err);
  }
});


router.get("/strategies/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const strategy = await strategyModel.findById(req.params.id).populate("user", "-password");
    if (!strategy) {
      const error = new Error("Strategia non trovata");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(strategy);
  } catch (err) {
    next(err);
  }
});


router.put("/strategies/:id", AuthMiddleware, validateStrategy, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedStrategy = await strategyModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedStrategy) {
      const error = new Error("Strategia non trovata");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedStrategy);
  } catch (err) {
    next(err);
  }
});


router.delete("/strategies/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const deletedStrategy = await strategyModel.findByIdAndDelete(req.params.id);
    if (!deletedStrategy) {
      const error = new Error("Strategia non trovata");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(deletedStrategy);
  } catch (err) {
    next(err);
  }
});


router.get("/strategies/user/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const strategies = await strategyModel.find({ user: req.params.id }).populate("user", "-password");
    res.status(200).json(strategies);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
