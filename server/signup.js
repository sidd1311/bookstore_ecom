const express = require('express');
const validator = require('validator');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use(bodyParser.json());

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'bookStore';
const saltRounds = 10;

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Register route
router.post('/signup', async (req, res) => {
  console.log('Received data:', req.body); // Log the received data

  const { f_name, l_name, email, mobile, password, confirmPassword } = req.body;

  const db = client.db(dbName);
  const collection = db.collection('users');

  try {
    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      console.log('Invalid email format');
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validate password
    const passwordValidations = [
      { test: /.{8,}/, message: 'Password must be at least 8 characters long' },
      { test: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain at least one special character' },
      { test: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
      { test: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
      { test: /[0-9]/, message: 'Password must contain at least one number' }
    ];

    for (const { test, message } of passwordValidations) {
      if (!test.test(password)) {
        console.log(message);
        return res.status(400).json({ success: false, message });
      }
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      email,
      password: hashedPassword,
      firstName: f_name,
      lastName: l_name,
      mobile,
    };

    // Insert user data
    const result = await collection.insertOne(userData);
    console.log('User registered successfully:', result);

    // Send success response
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

module.exports = router;




// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password'
//   }
// });
