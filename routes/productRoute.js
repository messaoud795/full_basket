const express = require("express");
const product = require("../models/productModel");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fileUpload = require("../middleware/file-upload");
const fs = require("fs");
const router = express.Router();

const categoryList = [
  "Laptop",
  "Smart phone",
  "Tablet",
  "Smart watch",
  "E book",
  "Accessories",
];
//send a product from each category to be dispalyed on home page
router.get("/home", async (req, res) => {
  var homeProducts = [];
  for (let i = 0; i < categoryList.length; i++) {
    let cat = categoryList[i];
    await product.findOne({ category: cat }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        homeProducts = [...homeProducts, data];
      }
    });
  }
  console.log(homeProducts)
  res.status(200).send(homeProducts);
});
//send products for a specific category
router.post("/category/", async (req, res) => {
  const foundProducts = await product.find({
    category: req.body.category,
  });
  try {
    if (foundProducts) {
      res.send(foundProducts);
    }
  } catch (error) {
    res.send(error);
  }
});

//send a product searched on the search box
router.post("/item", async (req, res) => {
  const foundProduct = await product.findOne({
    // title:$regex:{^" +req.body.item+"$"}
    title: { $regex: ".*" + req.body.item + ".*", $options: "i" },
  });
  try {
    if (foundProduct) {
      res.send(foundProduct);
    }
  } catch (error) {
    res.send(error);
  }
});
//send products found by Id
router.post("/", async (req, res) => {
  await product.find({ id: req.bodyproductsId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//send all products
router.get("/all", async (req, res) => {
  await product.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//create a product
router.post("/create", authAdmin, fileUpload.single("image"), async (req, res) => {
  const newProduct = await new product({
    title: req.body.title,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    category: req.body.category,
    image: req.file.path,
  });
  await newProduct.save((err) => {
    if (err) {
      if (req.file) {
        fs.unlink(req.file.path, (error) => {if (error) console.log(error)}); }
      res.send(err);} 
      else {res.send(true);};
  });
});
//update a product
router.put(
  "/update/:productId",
  authAdmin,
  fileUpload.single("image"),
  async (req, res) => {
    let Id = req.params.productId;
    let update;
    req.file
      ? (update = { ...req.body, image: req.file.path })
      : (update = req.body);
    product.findOneAndUpdate({ _id: Id }, update, (error, data) => {
      if (error) {
        if (req.file) {
          fs.unlink(req.file.path, (err) => console.log(err));
        }
        res.send(error);
      } else res.send(true);
    });
  }
);
//delete a product
router.delete(
  "/delete/:productId",
  authAdmin,
  fileUpload.single("image"),
   (req, res) => {

    let Id = req.params.productId;
    console.log("id", Id)
    product.findByIdAndRemove(Id, (error, data) => {
      if (!error) {
        if (req.file) {
          fs.unlink(req.file.path, (err) => console.log(err));
        }
        res.send(true);
      } else res.send(error);
    });
  }
);
module.exports = router;
