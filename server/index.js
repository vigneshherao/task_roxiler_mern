const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const RoxilerData = require("./models/roxilerModel");

main().then(()=>console.log("db connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/roxiler');

}

app.get("/initData",async (req,res)=>{
    try {
        const data = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const roxilerData = await data.json();
        await RoxilerData.insertMany(roxilerData).then((res)=>console.log(res)).catch((err)=>console.log(err));
        res.send("Data initialized sucessfully...")
    } catch (error) {
        console.log(error);
    }
})






app.listen(port,()=>{
    console.log(`Server is runnning on port ${port}`);
})