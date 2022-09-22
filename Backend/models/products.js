const mongoose = require('mongoose');

const { Schema } = mongoose;

const prodSchema = new Schema({
  title:  String,
  image: String,
  date: { type: Date, default: Date.now },
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Products',prodSchema);