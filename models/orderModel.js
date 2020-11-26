const mongoose=require("mongoose");
const Schema = mongoose.Schema;


const orderSchema=mongoose.Schema({
    sid:String,
    productsOrdred:[{product:{type:Schema.Types.ObjectId, ref:'product'}, quantityOrdred:Number}],
    status:[{description:String, time:String }],
    price:{type:Number}
});

module.exports= mongoose.model('order', orderSchema)