const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewars/AuthValidation");
const { signup, login } = require("../Controllers/AuthController");
const router = express.Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

module.exports = router;
