const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');

const app = express();

mongoose.connect('mongodb://localhost:27017/shoppingstore');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'shopsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/shoppingcart' })
}));

app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => res.redirect('/user/products'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
