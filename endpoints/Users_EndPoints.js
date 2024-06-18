const express = require('express');
const router = express.Router();

// Models
const userModel = require("../models/User")

router.get('/users', async (req, res, next) => {
    res.status(200).json(await userModel.find());
})

router.get('/users/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await userModel.findById(
                req.params.id
            )
        );
    } catch (err) {
        next();
    }
})



module.exports = router;