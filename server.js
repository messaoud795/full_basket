//importing
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const basketRoute = require("./routes/basketRoute");
const orderRoute = require("./routes/orderRoute");
const path=require('path')



//app config
const app = express();
const port=process.env.PORT || 5000;
app.use((req, res,next)=> {
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization')
  next()})
if (process.env.NODE_ENV==='production'){
  app.use(express.static('Front-end/build'));
//send the react html if url not for api or images
app.get("*",function (req,res, next)
{   let url=req.originalUrl;
  if (url.startsWith("/uploads")) {let file=url.slice(16);
   res.sendFile (path.resolve(__dirname, 'uploads', 'images', file));return;}

  else if (!(url.startsWith("/api/"))) {res.sendFile(path.resolve(__dirname, 'Front-end', 'build', 'index.html'));return}
next();});
}
//middlewaree


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use( '/uploads/images',express.static(path.join('uploads','images' )))
app.get('/uploads/images/:name', function (req,res)
 {   const fileName = req.params.name;  
  res.sendFile(fileName, options, function (err) { console.log(err)});}
  );



const mongo_url = "mongodb+srv://nabil123:1d2a3m4m5e@cluster0.pkyyp.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(process.env.mongo_url ||mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,useCreateIndex: true,
  useFindAndModify: false
});
//Connection check to mongodb server
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected the database server");
});
//api routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/basket", basketRoute);
app.use("/api/order", orderRoute);

// listner
app.listen(port, () => console.log("server is running on port  "+port));
