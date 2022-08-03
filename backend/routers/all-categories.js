const express = require("express");
const router = express.Router();
const { AllCategory } = require("../models/all-categories");

router.get("/", async (req, res) => {
  const allCategories = await AllCategory.find();
  res.send(allCategories);
});

router.post("/", async (req, res) => {
  let allCategories = new AllCategory({
    name: req.body.name,
  });
  allCategories = await allCategories.save();

  res.status(201).send(allCategories);
});

router.get("/:id", async (req, res) => {
  const allCategories = await AllCategory.findById(req.params.id);
  if (!allCategories) {
    return res.status(404).send("That type od id not found...");
  }
  res.send(allCategories);
});

router.put("/:id", async (req, res) => {
  const allCategories = await AllCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!allCategories) {
    return res.status(404).send("That type of id not found...");
  }
  ``;
  res.send(allCategories);
});

router.delete("/:id", async (req, res) => {
  const allCategories = await AllCategory.findByIdAndRemove(req.params.id);
  if (!allCategories) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(allCategories);
});
module.exports = router;
