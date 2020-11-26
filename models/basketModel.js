const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const basketSchema=mongoose.Schema({
    productsSelected:[{product:{type:Schema.Types.ObjectId, ref:'product'}, quantityOrdred:Number}],
    time:{type : String, required :true}
 
});

module.exports= mongoose.model('basket', basketSchema)