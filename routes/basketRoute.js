const express = require("express");
const basket = require("../models/basketModel");
const user = require("../models/userModel");
const product = require("../models/productModel");
const auth = require("../middleware/auth");
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

//create a basket for a connected user
router.post("/", auth,( (req, res) => {
  //create and save the new basket
  const newBasket = new basket({ time: req.body.time }); 
 newBasket.productsSelected.push(...(JSON.parse(req.body.basket)));
  newBasket.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
  //add the basket created to the user
  user.updateOne(
    { _id: ObjectID(req.userData.userId) },
    { $set: { basketId: newBasket.id } },
    { upsert: true },
    (err) => (err ? console.log(err) : console.log("successfully updated"))
  );
}));
//send basket of a customer
router.get("/", auth, (req, res) => {
  user
    .findById(req.userData.userId)
    .populate("basketId")
    .exec(async (err, user) => {
      if (err) res.send(err);
      else {
        let y = await basket
          .findById(user.basketId)
          .populate("productsSelected.product");
        res.send(y);
      }
    });
});
//Remove basket after order validation
router.delete("/", auth, async (req, res) => {
  let { basketId } = await user
    .findById(req.userData.userId)
    .select("basketId");
  basket.deleteOne({ _id: basketId }, (err, data) =>
    err ? console.log(err) : res.send(data)
  );
});

module.exports = router;
