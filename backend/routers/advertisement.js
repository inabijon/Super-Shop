const express = require("express");
const router = express.Router();
const { Advertisement } = require("../models/advertisement");

router.get("/", async (req, res) => {
  const advertisement = await Advertisement.find();
  res.send(advertisement);
});

router.post("/", async (req, res) => {
  let advertisement = new Advertisement({
    title: req.body.title,
    imgUrl: req.body.imgUrl,
  });
  advertisement = await advertisement.save();

  res.status(201).send(advertisement);
});


router.put("/:id", async (req, res) => {
  const advertisement = await Advertisement.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      imgUrl: req.body.imgUrl,
    },
    { new: true }
  );

  if (!advertisement) {
    return res.status(404).json({ message: "That type of id not found..." });
  }
  res.send(advertisement);
});

router.delete("/:id", async (req, res) => {
  const advertisement = await Advertisement.findByIdAndRemove(req.params.id);
  if (!advertisement) {
    return res.status(404).json({ message: "That type of id not found..." });
  }
  res.send(advertisement);
});
module.exports = router;
