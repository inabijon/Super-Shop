const mongoose = require("mongoose");

const AllCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const allCategories = mongoose.model("AllCategory", AllCategorySchema);
exports.AllCategory = allCategories;

