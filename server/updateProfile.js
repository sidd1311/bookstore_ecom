const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'bookStore';

router.post('/updateprofile', async (req, res) => {
  const { userId, firstName, lastName, mobile } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.updateOne(
      { _id: ObjectId(userId) },
      { $set: { firstName, lastName, mobile } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update profile' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

module.exports = router;
