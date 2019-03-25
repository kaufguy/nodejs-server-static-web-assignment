const express = require('express');
const Router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Stock = require('../models/stock');

Router.post('/recommend', [
        check('items', 'no items array provided')
            .exists()
            .isArray()
            .custom((items) => {
            return Array.isArray(items) && !items.some((item)=>{
                if (isNaN(parseFloat(item.value)) || isNaN(new Date(item.date))){
                    return true;
                }
            })
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        Stock.recommend(req.body.items, (err, recommendation) => {
            res.json(recommendation);
        })
})

module.exports = Router
