const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private

router.get("/me", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  try {
    const decode = jwtDecode(token);
    res.json(decode.userId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
