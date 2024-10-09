const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/FetchUser");


//Route1:create A user using:POST "/api/auth/createUser". No Login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enetr a valid Email,").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //upon errors return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if Email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry User with Email already Exists" });
      }

      //hashing Password
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      //Creating User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      //Genrating a Auth Token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "JWT_Secrete"); //idealy secrete is kept in a config/env file for safety
      res.json({ authToken });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Inetrnal Server Error");
    }
  }
);

//Route 2: Authenticate a user using:POST "/api/auth/login". No Login required

router.post(
  "/login",
  [
    body("email", "Enetr a valid Email,").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    //upon errors return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //searching email in DB
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials Please Try Again" });
      }
      //validating password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials Please Try Again" });
      }
      //sending auth Token
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, "JWT_Secrete"); //idealy secrete is kept in a config/env file for safety
      res.json({ authToken });
    } catch (error) {
      // console.error(error.message);
      showAlert(error.message, "danger");
      res.status(500).send("Inetrnal Server Error");
    }
  }
);

// Route 3: Feching Details of Loggedin User using:POST "/api/auth/getUser". Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    // console.error(error.message);
    showAlert(error.message, "danger");
    res.status(500).send("Inetrnal Server Error");
  }
});
module.exports = router;
