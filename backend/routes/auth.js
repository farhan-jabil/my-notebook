const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "JabilIsAGoodB$oy";

// Route 1: for signup "http://localhost:5000/api/auth/createuser"

router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("username", "Enter a valid username").isLength({ min: 3 }),
  body("phone", "Enter a valid phone number").isNumeric(),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least five characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ username: req.body.username }).exec();
      if (user) {
        return res
          .status(400)
          .json({ msg: "Sorry, this username is already taken" });
      }

      const salt = 10;
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        id: user.id, // Assuming _id is the unique identifier for users
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({msg: "User created succefully" , details: user , "authtoken": authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred in signup");
    }
  }
);

// Route 2: for login "http://localhost:5000/api/auth/login"

router.post(
  "/login",
  body("username", "Username cannot be blank").exists(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }).exec();

      if (!user) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Incorrect credentials" });
      }

      const data = {
        id: user.id, // Assuming _id is the unique identifier for users
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ Status: "Login Successfully", authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ Status: "Internal server error" });
    }
  }
);


// Route 3: for user information http://localhost:5000/api/auth/getusers
router.post("/getusers", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Status: "Internal server error" });
  }
});


module.exports = router;
