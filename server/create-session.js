const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load environment variables from .env file
require('dotenv').config();

const secret_key = "Your_Secret";
const app_id = "Your_API";

// Route to create Cashfree session
router.post('/create-session', async (req, res) => {
    const { order_id, order_amount, customer_details } = req.body;
    console.log(order_id);
    const orderId = order_id;
    console.log(customer_details);
    const data = {
        orderId,
        order_amount,
        order_currency: 'INR',
        customer_details,
        version: '2023-08-01'
    };

    try {
        const response = await axios.post('https://sandbox.cashfree.com/pg/orders', data, {
            headers: {
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json',
                'x-client-id': app_id,
                'x-client-secret': secret_key
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating session ID:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to create session ID' });
    }
});

module.exports = router;
