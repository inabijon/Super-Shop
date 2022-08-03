const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Email yoki parol noto'g'ri" });

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword)
    return res.status(400).json({
      message: "Email yoki parol noto'g'ri",
    });

  const token = user.generateAuthToken();

  res.status(200).send({ token: token, expiresIn: 3600 });
});

module.exports = router;
