const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route  POST user/register
// @desc   Register user
// @access Public
router.post(
  "/register",
  [
    check("name", "Поле с именем обязательно для заполнения")
      .not()
      .isEmpty(),
    check("surname", "Поле с фамилией обязательно для заполнения")
      .not()
      .isEmpty(),
    check("email", "Пожалуйста, укажите валидный Email").isEmail(),
    check("password", "Минимальная длинна пароля 6 символов").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Такой пользователь уже существует" }] });
      }

      user = new User({
        name,
        surname,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      console.log(token, user.id);
      res.json({ token, userId: user.id });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
