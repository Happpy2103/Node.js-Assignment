const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
  const products = await Product.find().populate('category subcategory');
  res.render('user/products', { products, cart: req.session.cart || [] });
});

router.get('/add-to-cart/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(product);
  res.redirect('/user/products');
});

router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('user/cart', { cart });
});

module.exports = router;
