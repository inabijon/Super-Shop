const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 2000,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    max: 50000,
  },
  categoryName: {
    type: String,
  },
  new: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  discountPercent: {
    type: Number,
    default: 0
  },
  qtyTotal: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);
exports.Product = Product;

