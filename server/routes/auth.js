const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fetchToken = require("../middlewares/fetchToken");

dotenv.config();

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "User already exists..." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      res.status(500).json({ success, error: "Internal Server Error..." });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Invalid email or password..." });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Invalid email or password..." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      res.status(500).json({ success, error: "Internal Server Error..." });
    }
  }
);

router.post("/fetchUser", fetchToken, async(req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    res.status(200).json({ success, user });
  } catch (error) {
    success = false;
    res.status(500).json({ success, error: "Internal server error..." });
  }
});

module.exports = router;
