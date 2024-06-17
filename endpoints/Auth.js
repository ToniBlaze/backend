const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const saltRounds = 10;
const bcriptPassword = process.env.APP_PASSWORD_BCRIPT;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

// Models
const UserModel = require('../models/Users');

// Validation middleware
const validateRegisterInput = [
  body('name').notEmpty().trim().escape().isAlpha().withMessage('Il nome non può contenere numeri o simboli'),
  body('lastname').notEmpty().trim().escape().isAlpha().withMessage('Il cognome non può contenere numeri o simboli'),
  body('birthdate').notEmpty().trim().isDate().withMessage('Inserisci una data valida'),
  body('zipCode').notEmpty().trim().escape().withMessage('Lo ZipCode puo\' avere solo numeri'),
  body('city').notEmpty().trim().escape().isAlpha().withMessage('La città non può contenere numeri o simboli'),
  body('email').notEmpty().trim().isEmail().withMessage('Email non valida'),
  body('password').notEmpty().trim().isLength({ min: 6 }).withMessage('La password deve contenere almeno 6 caratteri'),
];

const validateLoginInput = [
  body('email').notEmpty().trim().isEmail().withMessage('Email non valida'),
  body('password').notEmpty().withMessage('Password mancante'),
];

// Auth Endpoints
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  try {
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ error: 'Utente già presente!' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new UserModel({
        ...req.body,
        password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
});



router.post('/login', validateLoginInput, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Email sbagliata o utente non registrato' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Password sbagliata' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
      jwtSecretKey,
      { expiresIn: '6h' }
    );

    return res.status(200).json(token);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;