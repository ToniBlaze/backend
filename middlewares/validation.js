const { body } = require('express-validator');

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



module.exports = { validateRegisterInput, validateLoginInput };
  