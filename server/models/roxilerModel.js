const mongoose = require('mongoose');


const roxilerSchema = new mongoose.Schema({
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:Date
})


const RoxilerData = mongoose.model("RoxilerData",roxilerSchema);


module.exports = RoxilerData;