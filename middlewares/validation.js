const { body } = require('express-validator');

const validateRegisterInput = [
    body('name').notEmpty().trim().withMessage("Nome mancante!")
        .escape().isAlpha().withMessage('Il nome non puo\' contenere numeri o simboli'),

    body('lastname').notEmpty().trim().withMessage("Cognome mancante!")
        .escape().isAlpha().withMessage('Il cognome non puo\' contenere numeri o simboli'),

    body('address.street').notEmpty().trim().withMessage('Indirizzo mancante'),

    body('address.houseNumber').notEmpty().trim().withMessage('Numero civico mancante'),

    body('address.zipCode').notEmpty().trim().withMessage("Valuta mancante!")
        .escape().isNumeric().withMessage('Lo ZipCode puo\' avere solo numeri'),

    body('address.city').notEmpty().trim().withMessage("Citta\' mancante!")
        .escape().isAlpha().withMessage('La citta\' non puo\' contenere numeri o simboli'),

    body('birthdate').notEmpty().trim().withMessage("Data di nascita mancante!")
        .isISO8601().withMessage('Inserisci una data valida'),

    body('email').notEmpty().trim().withMessage("Email mancante!")
        .isEmail().withMessage('Email non valida'),

    body('password').notEmpty().trim().withMessage("Password mancante!")
        .isLength({ min: 6 }).withMessage('La password deve contenere almeno 6 caratteri')

];
  
const validateLoginInput = [
    body('email').notEmpty().trim().withMessage("Email mancante!")
        .isEmail().withMessage('Email non valida'),

    body('password').notEmpty().withMessage('Password mancante')

];

const validateAccount = [
    body("user")
        .notEmpty().trim().withMessage("Utente mancante!")
        .isMongoId().withMessage("ID utente non valido!"),
    body("balance")
        .notEmpty().trim().withMessage("Saldo mancante!")
        .escape().isNumeric().withMessage("Saldo deve essere un numero!"),
    body("currency")
        .notEmpty().trim().withMessage("Valuta mancante!")
        .isString().withMessage("Valuta non valida"),
    body("title")
        .notEmpty().trim().withMessage("Titolo mancante!")
        .isString().withMessage("Titolo non valido"),
];


const validateUser = [

    body('address.street').notEmpty().trim().withMessage('Indirizzo mancante'),

    body('address.houseNumber').notEmpty().trim().withMessage('Numero civico mancante'),

    body('address.zipCode').notEmpty().trim().withMessage("Valuta mancante!")
        .escape().isNumeric().withMessage('Lo ZipCode puo\' avere solo numeri'),

    body('address.city').notEmpty().trim().withMessage("Citta\' mancante!")
        .escape().isAlpha().withMessage('La citta\' non puo\' contenere numeri o simboli'),

    body('email').notEmpty().trim().withMessage("Email mancante!")
        .isEmail().withMessage('Email non valida'),

];


module.exports = { validateRegisterInput, validateLoginInput, validateAccount, validateUser };
  

