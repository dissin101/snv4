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
    const profile = await Profile.findOne({
      user: decode.userId,
    });

    console.log(decode);

    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST /profile
// @desc   Create or update user profile
// @access Private
router.post("/", auth, async (req, res) => {
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

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: decode.userId },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
