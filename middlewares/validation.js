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

const validateStrategy = [
    body("user")
        .notEmpty().trim().withMessage("Utente mancante!")
        .isMongoId().withMessage("ID utente non valido!"),

    body('name').notEmpty().trim().withMessage("Nome mancante!")
        .isString().withMessage('Il nome non e\' valido'),

    body('type').trim().isString().notEmpty().withMessage('Inserire il Tipo di strategia'),

    body('assetCategory').trim().escape().isString().notEmpty().withMessage('Inserire la categoria degli asset'),

    body('timeframe').trim().isString().notEmpty().withMessage('Inserire il Timeframe'),

    body('description').trim().isString().notEmpty().withMessage('Descrizione mancante')

];


const validateTrade = [
    body("author").notEmpty().trim().withMessage("Utente mancante!")
        .isMongoId().withMessage("ID utente non valido!"),

    body("strategy").notEmpty().trim().withMessage("Strategia mancante!")
        .isMongoId().withMessage("ID Strategia non valido!"),

    body("account").notEmpty().trim().withMessage("Account mancante!")
        .isMongoId().withMessage("ID Account non valido!"),

    body("asset").notEmpty().trim().withMessage("Asset mancante!")
        .isString().withMessage("Asset non valido"),

    body("title").notEmpty().trim().withMessage("Titolo trade mancante!"),

    body("size").notEmpty().trim().withMessage("Size mancante!")
        .escape().isNumeric().withMessage("La Size deve essere un numero"),

    body("date").notEmpty().trim().withMessage("Data del trade mancante!")
        .isISO8601().withMessage("Inserisci una data valida"),

    body("entryPrice").notEmpty().trim().withMessage("Prezzo di entrata mancante!")
        .escape().isNumeric().withMessage("Il prezzo inserito non e\' valido"),

    body("isClosed").notEmpty().trim().withMessage("Stato del trade mancante!")
        .isBoolean().withMessage("Stato del trade non valido")
];


module.exports = { validateRegisterInput, validateLoginInput, validateAccount, validateUser, validateStrategy, validateTrade };
  

