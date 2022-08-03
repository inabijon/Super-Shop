const express = require("express");
const router = express.Router();
const { Contact } = require("../models/contact");



router.get("/", async (req, res) => {
  const message = await Contact.find();
  if (!message) {
    res.status(404).json({
      message: 'None send message yet !'
    });
  }
  res.json({
    message: message
  });
});

router.post('/', async (req, res) => {
  let message = new Contact({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    subject: req.body.subject,
    message: req.body.message,
  });
  message = await message.save();
  res.status(201).json({
    message: message
  });
})

router.get("/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "That type od id not found..." });
  }
  res.json({
    contact: contact
  });
});

router.delete("/:id", async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "That type of id not   found..." });
  }
  res.send(contact);
});

module.exports = router;
