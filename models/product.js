const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema(
    {
        name: {type:String},
        description: {type:String},
        price: {type:String},
        image:{type:String},
    }
)

const Model = new mongoose.model('products',productModel)

module.exports = Model