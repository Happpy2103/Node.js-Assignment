const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const Category = require('../models/Category');
const Product = require('../models/Product');

const upload = multer({ dest: 'public/uploads/' });

// Render admin login page
router.get('/login', (req, res) => res.render('admin/login'));

// Static admin login POST route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Static credentials
  const adminUsername = 'Admin';
  const adminPassword = 'Admin123';

  if (username === adminUsername && password === adminPassword) {
    // Store admin info in session
    req.session.admin = { username: adminUsername, role: 'admin' };
    return res.redirect('/admin/dashboard');
  }

  res.send('Invalid login');
});

// Admin dashboard — protected route
router.get('/dashboard', async (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');

  const categories = await Category.find({ parent: null });
  const subcategories = await Category.find({ parent: { $ne: null } });
  const products = await Product.find().populate('category subcategory');

  res.render('admin/dashboard', { categories, subcategories, products });
});

// Add category or subcategory
router.post('/category', async (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');

  const { name, parent } = req.body;
  await Category.create({ name, parent: parent || null });
  res.redirect('/admin/dashboard');
});

// Add product
router.post('/product', upload.single('image'), async (req, res) => {
  if (!req.session.admin) return res.redirect('/admin/login');

  const { title, description, price, category, subcategory } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '';
  await Product.create({ title, description, price, category, subcategory, image });
  res.redirect('/admin/dashboard');
});

module.exports = router;
