const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
});

const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
exports.Advertisement = Advertisement;
