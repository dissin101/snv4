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
// @desc   Create and GET current users profile
// @access Private

router.get("/me", auth, async (req, res) => {
  // Get user ID from token
  const token = req.header("x-auth-token");
  const decode = jwtDecode(token);

  // Build profile object
  const profileFields = {};
  profileFields.user = decode.userId;

  try {
    let userData = await User.findById(decode.userId);
    let profile = await Profile.findOne({ user: decode.userId });

    profileFields.name = userData.name;
    profileFields.surname = userData.surname;
    profileFields.email = userData.email;

    if (!profile) {
      // Create profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/profile/settings
// @desc   Change user profile
// @access Private

router.post("/settings", auth, async (req, res) => {
  const { name, surname, phone, email, city } = req.body;

  console.log(req.body);

  // Get user ID from token
  const token = req.header("x-auth-token");
  const decode = jwtDecode(token);

  // Build profile object
  const profileFields = {};
  profileFields.user = decode.userId;
  if (name) profileFields.name = name;
  if (surname) profileFields.surname = surname;
  if (phone) profileFields.phone = phone;
  if (email) profileFields.email = email;
  if (city) profileFields.city = city;
  try {
    let profile = await Profile.findOne({ user: decode.userId });

    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: decode.userId },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
