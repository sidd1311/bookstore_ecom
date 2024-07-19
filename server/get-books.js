    const express = require('express');
    const { MongoClient } = require('mongodb');
    const cors = require('cors');
    const router = express.Router();
    const { ObjectId } = require('mongodb');

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

    // Get all books
// Get all books with optional filters
router.get('/books', connectDB, async (req, res) => {
    const { category, author } = req.query;
    const filters = {};

    if (category) {
        filters.category = category;
    }

    if (author) {
        filters.author = author;
    }

    try {
        console.log('Filters applied:', filters); // Log applied filters
        const books = await req.db.collection('books').find(filters).toArray();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books', error);
        res.status(500).json({ error: 'Error fetching books' });
    } finally {
        req.dbClient.close();
    }
});

    // Get a single book by ID
    router.get('/book/:id', connectDB, async (req, res) => {
        const { id } = req.params;
        try {
            const book = await req.db.collection('books').findOne({ _id: new ObjectId(id) });
            if (!book) {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.status(200).json(book);
            }
        } catch (error) {
            console.error('Error fetching book', error);
            res.status(500).json({ error: 'Error fetching book' });
        } finally {
            req.dbClient.close();
        }
    });

    // Get distinct categories
    router.get('/categories', connectDB, async (req, res) => {
        try {
            const categories = await req.db.collection('books').distinct('category');
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories', error);
            res.status(500).json({ error: 'Error fetching categories' });
        } finally {
            req.dbClient.close();
        }
    });

    // Get distinct authors
    router.get('/authors', connectDB, async (req, res) => {
        try {
            const authors = await req.db.collection('books').distinct('author');
            res.status(200).json(authors);
        } catch (error) {
            console.error('Error fetching authors', error);
            res.status(500).json({ error: 'Error fetching authors' });
        } finally {
            req.dbClient.close();
        }
    });


    // Search books by title
    router.get('/search', connectDB, async (req, res) => {
        const query = req.query.q;
        try {
            const searchResults = await req.db.collection('books').find({ title: new RegExp(query, 'i') }).toArray();
            res.status(200).json(searchResults);
        } catch (error) {
            console.error('Error searching books', error);
            res.status(500).json({ error: 'Error searching books' });
        } finally {
            if (req.dbClient) {
                req.dbClient.close();
            }
        }
    });


    module.exports = router;
