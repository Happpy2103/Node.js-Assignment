const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String
});

module.exports = mongoose.model('Product', productSchema);
