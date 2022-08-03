const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    maxlength: 1000,
    required: true,
  },
  number: {
    type: Number,
    min: 5,
    maxlength: 1000,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    max: 1000,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Contact = mongoose.model("Contact", ContactSchema);
exports.Contact = Contact;
exports.ContactSchema = ContactSchema;
