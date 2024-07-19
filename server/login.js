const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();
const app = express();

app.use(cookieParser());

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'bookStore';

router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Destructure both email and password

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const existUser = await collection.findOne({ email });

    if (!existUser) {
      return res.status(400).send('User Does Not Exist, Please Signup First');
    }

    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res.status(400).send('Incorrect Password');
    }

    const token = jwt.sign(
      { id: existUser._id, email },
      'shhh',
      { expiresIn: '2h' }
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    const { _id, email: userEmail, firstName, lastName } = existUser;
    const limitedExistUser = { _id, email: userEmail, firstName, lastName };

    res.cookie('token', token, options).json({ existUser: limitedExistUser, token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/fetchuser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const existingUser = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, email, firstName, lastName, mobile } = existingUser;
    const limitedExistUser = { _id, email, firstName, lastName, mobile };

    res.json(limitedExistUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').redirect('/');
});

router.put('/updateuser/:id', async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const updatedUser = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnOriginal: false }
    );
    console.log(updatedUser)

   const _id = updatedUser._id;
   const email = updatedUser.email;
   const firstName = updatedUser.firstName;
   const lastName = updatedUser.lastName;
   const mobile = updatedUser.mobile;




    const limitedUpdatedUser = { _id, email, firstName, lastName, mobile };

    console.log('User updated successfully:', limitedUpdatedUser);
    res.json(limitedUpdatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
