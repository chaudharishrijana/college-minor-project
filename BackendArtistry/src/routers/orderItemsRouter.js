const express = require('express');

const router = express.Router();
const db = require('../models');
const {validateToken, validateArtist} = require('../middlewares/AuthMiddleware');
const orderitems = db.orderitems;
const artworks = db.artworks
;

router.get('/', validateToken, async (req, res) => {
    try {
        const allOrderItems = await orderitems.findAll();
        res.json(allOrderItems);
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

router.post('/add', validateToken, async (req, res) => {
    try {
        const newOrderItem = await orderitems.create(req.body);

        const artwork = await artworks.findById(req.body.artwork_id);

        if (artwork) {
            // If the product is found, set its sold status to 1
            await artworks.update({sold: "sold"}, {where: {id: req.body.artwork_id}});
        } else {
            // If the product is not found, return a 404 error
            return res.status(404).send({error: 'Product not found'});
        }

        // Send the newly created order item as JSON response
        res.json(newOrderItem);
    } catch (err) {
        // Handle errors if any
        res.status(400).send({error: err.message});
    }
});

//get orderitems with orderid

router.get('/order/:id', validateToken, async (req, res) => {
        try {
            const orderItems = await orderitems.findAll({where: {order_id: req.params.id}});
            res.json(orderItems);
        } catch (err) {
            res.status(400).send({error: err.message});
        }
    }
);


module.exports = router;