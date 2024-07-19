const express = require('express');
const app = express();
const bookroutes = require('./store-book');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const getbookroutes = require ('./get-books')
const create_session = require('./create-session')
const signuproute = require('./signup')
const loginroute = require('./login')
const updateRoute = require('./updateProfile')
const saveorder = require('./order')
const add_to = require('./cart')


// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', bookroutes);

app.use('/', create_session, getbookroutes, signuproute, loginroute, updateRoute, saveorder, add_to)
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
