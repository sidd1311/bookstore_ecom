const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const router = express.Router();

// MongoDB connection setup
const url = 'mongodb://localhost:27017';
const dbName = 'bookStore';

// Middleware to establish MongoDB connection
const connectDB = async (req, res, next) => {
    let client;
    try {
        client = await MongoClient.connect(url, {});
        req.dbClient = client; 
        req.db = client.db(dbName); 
        next();
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        res.status(500).json({ error: 'Failed to connect to database' });
    }
};

router.post('/cart/add', connectDB, async (req, res) => {
    const response = req.body;
    console.log(response)
    // try {
    //     const result = await req.db.collection('orders').insertOne({
    //         ...orderDetails,
    //         paymentStatus: 'paid', // Default payment status
    //         createdAt: new Date(),
    //     });
    //     res.status(201).json({ success: true, orderId: result.insertedId });
    // } catch (error) {
    //     console.error('Error saving order', error);
    //     res.status(500).json({ error: 'Error saving order' });
    // } finally {
    //     req.dbClient.close();
    // }
});

module.exports = router;

