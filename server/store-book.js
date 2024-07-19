    const express = require('express');
    const multer = require('multer');
    const { ObjectId } = require('mongodb');
    const MongoClient = require('mongodb').MongoClient;
    const path = require('path');
    const cors = require('cors'); // Import cors module
    const router = express.Router();

    // MongoDB connection setup
    const url = 'mongodb://localhost:27017';
    const dbName = 'bookStore';

    // Multer configuration for file uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({ storage: storage });

    // Middleware to establish MongoDB connection
    const connectDB = async (req, res, next) => {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            req.dbClient = client; // Attach MongoDB client to request object
            req.db = client.db(dbName); // Attach database object to request object
            next();
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            res.status(500).json({ error: 'Failed to connect to database' });
        }
    };

    // Add a book with an image
    router.post('/books', connectDB, upload.single('image'), async (req, res) => {
        const { title, author, price, category, tag, description } = req.body;
        const imagePath = req.file ? req.file.path : null;

        try {
            const result = await req.db.collection('books').insertOne({
                title, author, price, category, tag, description, image: imagePath
            });
            res.status(200).json({ message: 'Book added successfully.' });
        } catch (error) {
            console.error('Error adding book', error);
            res.status(500).json({ error: 'Error adding book' });
        } finally {
            // Close the client connection after operation
            req.dbClient.close();
        }
    });

    // Delete a book
    router.delete('/books/:id', connectDB, async (req, res) => {
        const { id } = req.params;

        try {
            const result = await req.db.collection('books').deleteOne({ _id: new ObjectId(id) });
            res.status(200).json({ message: 'Book deleted successfully.' });
        } catch (error) {
            console.error('Error deleting book', error);
            res.status(500).json({ error: 'Error deleting book' });
        } finally {
            // Close the client connection after operation
            req.dbClient.close();
        }
    });

    module.exports = router;
