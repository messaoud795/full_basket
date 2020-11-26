const express = require("express");
const user = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authAdmin = require("../middleware/authAdmin");

//register a user
router.post("/register", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    password: hashedPassword,
  });
  let token;
  try {
    token = await jwt.sign(
      { userId: newUser._id, userEmail: newUser.email },
      "supersecret"
    );
  } catch (error) {
    console.log(error);
  }
  newUser.save(newUser, (err) => {
    err
      ? res.send({ msg: "Email already existed" })
      : res.send({
          id: newUser._id,
          firstName: newUser.firstName,
          token: token,
        });
  });
});

//Sign in a user
router.post("/signIn", async (req, res) => {
  var signInUser = await user.findOne({
    email: req.body.email,
  });
  if (signInUser) {
    let foundPassword = await bcrypt.compare(
      req.body.password,
      signInUser.password
    );
    if (foundPassword) {
      let token;
      try {
        token = await jwt.sign(
          { userId: signInUser._id, userEmail: signInUser.email },
          "supersecret"
        );
      } catch (error) {
        console.log(error);
      }
      res.send({
        id: signInUser._id,
        firstName: signInUser.firstName,
        token: token,
      });
    } else {
      res.send({ msg: "Invalid password" });
    }
  } else {
    res.send({ msg: "Invalid email" });
  }
});
router.post("/register", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    email: req.body.email,
    password: hashedPassword,
  });
  let token;
  try {
    token = await jwt.sign(
      { userId: newUser._id, userEmail: newUser.email },
      "supersecret"
    );
  } catch (error) {
    console.log(error);
  }
  newUser.save(newUser, (err) => {
    err
      ? res.send({ msg: "Email already existed" })
      : res.send({
          id: newUser._id,
          firstName: newUser.firstName,
          token: token,
        });
  });
});

//Sign in admin
router.post("/admin", async (req, res) => {
  var signInUser = await user.findOne({
    email: req.body.email,
  });
  if (signInUser) {
    let foundPassword = await bcrypt.compare(
      req.body.password,
      signInUser.password
    );
    if (foundPassword && signInUser.isAdmin) {
      let token;
      try {
        token = await jwt.sign(
          {
            userId: signInUser._id,
            userEmail: signInUser.email,
            isAdmin: signInUser.isAdmin,
          },
          "supersecret"
        );
      } catch (error) {
        console.log(error);
      }
      console.log("logged in");
      res.send({
        id: signInUser._id,
        firstName: signInUser.firstName,
        token: token,
      });
    } else {
      res.send({ msg: "Invalid password" });
    }
  } else {
    res.send({ msg: "Invalid email" });
  }
});
//get all users
router.get("/all", authAdmin, async (req, res) => {
  let users = await user.find({}).select("firstName lastName address isAdmin");
  try {
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
//update the status of a user
router.put("/update", authAdmin, async (req, res) => {
  console.log(req.body)
  user.findByIdAndUpdate(
    req.body._id,
    { isAdmin: req.body.isAdmin },
    ((err, data) => err ? res.send(err) : res.send(true))
  );
});

module.exports = router;
