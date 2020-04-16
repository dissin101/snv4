const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET /profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", async (req, res) => {
  console.log(auth.userId);
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

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

module.exports = router;
