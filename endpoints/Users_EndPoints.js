const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Models
const userModel = require("../models/User");

// Middleware
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const validation = require('../middlewares/Validation')
const { validateUser } = validation


router.get("/users", AuthMiddleware, async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      const error = new Error("Utente non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", AuthMiddleware, validateUser, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedUser) {
      const error = new Error("Utente non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", AuthMiddleware, async (req, res, next) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      const error = new Error("Utente non trovato");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Utente eliminato con successo" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
