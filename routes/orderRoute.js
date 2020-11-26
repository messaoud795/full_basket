const express = require("express");
const order = require("../models/orderModel");
const user = require("../models/userModel");
const product = require("../models/productModel");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

//create order
router.post("/create/", auth, async (req, res) => {
  //create and save the new order
  var newOrder = new order({ price: req.body.price });
  newOrder.productsOrdred.push(...req.body.basket);
  newOrder.status.push(
    { description: "created", time: req.body.time },
    { description: "shipped", time: " " },
    { description: "delivred", time: " " },
    { description: "closed", time: " " }
  );
  newOrder.sid = newOrder.id.substring(16, 24);
  await newOrder.save();
  //update stock after order Validation
  newOrder.productsOrdred.map((productOrdred) => {
    product.findById(
      { $in: productOrdred.product },
      (err, ProductToUpdate) => {
        let newStock=ProductToUpdate.stock - productOrdred.quantityOrdred ;
        product.findOneAndUpdate(
          { _id: ProductToUpdate._id },
          { stock: newStock},
          {upset:true},
          (err, update) =>
           console.log("Updated",update)
        );
      }
    );
  });

  //add  created orderId to the user
  user.updateOne(
    { _id: ObjectID(req.userData.userId) },
    { $push: { orderId: newOrder.id } },
    { upsert: true },
    (err) => (err ? console.log(err) : res.send(true))
  );
});

//get the list of orders
router.get("/", auth, async (req, res) => {
  //add  created orderId to the user
  user.find({ _id: req.userData.userId }, (err, found) => {
    let ordersId = found[0].orderId;
    order
      .find({ _id: { $in: ordersId } })
      .populate("productsOrdred.product", "title price ")
      .exec((err, orders) => {
        res.send(orders);
      });
  });
});

//get the list of orders
router.get("/management", auth, async (req, res) => {
  //get the list of users and their orders
  user
    .find({})
    .populate("orderId")
    .select("firstName lastName orderId")
    .exec((err, data) => {
      res.send(data);
    });
});
//get an order and its customer
router.get("/update/:orderSId", auth, async (req, res) => {
  const orderId = await order
    .findOne({ sid: { $in: [req.params.orderSId] } })
    .select("orderId");
  const client = await user
    .findOne({ orderId: { $in: [orderId] } })
    .select("firstName lastName address");
  order
    .findOne({ _id: { $in: orderId } })
    .populate("productsOrdred.product", "title")
    .exec((err, data) => {
      if (err) console.log(err);
      else {
        res.send({ client: client, order: data });
      }
    });
});
//update the status of an order
router.put("/status", authAdmin, async (req, res) => {
  const newOrder = req.body;
  order.findByIdAndUpdate(newOrder._id, newOrder, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.send(true);
    }
  });
});

module.exports = router;
