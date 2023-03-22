const router = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../modeles/User.Schema")

router.post("/signup", async (req, res, next) => {
  try {
    const {password, email} = req.body
    const saltedRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltedRounds)
    const response = await User.create({email, password: hashedPassword})
    res.status(201).json({message: "created user"})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
