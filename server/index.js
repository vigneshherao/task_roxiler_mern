const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const RoxilerData = require("./models/roxilerModel");
const cors = require("cors");
const { Console } = require("console");
require("dotenv").config();

const allowedOrigin = "https://task-roxiler-mern-vignesh.onrender.com";

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.options("*", cors());

const dbUrl = process.env.ATLASDBURL;
main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error(err);
  }
}

app.get("/initData", async (req, res) => {
  try {
    RoxilerData.deleteMany({});
    const data = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const roxilerData = await data.json();
    await RoxilerData.insertMany(roxilerData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    res.send("Data initialized sucessfully...");
  } catch (error) {
    console.log(error);
  }
});

app.get("/list", async (req, res) => {
  try {
    const lists = await RoxilerData.find();
    res.json(lists);
  } catch (error) {}
});

app.get("/list/month", async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);
    const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
    const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);
    const items = await RoxilerData.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [{ $month: "$dateOfSale" }, selectedMonth] },
              { $lt: [{ $month: "$dateOfSale" }, selectedMonth + 1] },
            ],
          },
        },
      },
    ]);

    res.json(items);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/statistics", async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);
    const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
    const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);
    const totalSaleAmount = await RoxilerData.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [{ $month: "$dateOfSale" }, selectedMonth] },
              { $lt: [{ $month: "$dateOfSale" }, selectedMonth + 1] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);
    const totalSoldItems = await RoxilerData.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: true,
    });
    const totalNotSoldItems = await RoxilerData.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: false,
    });
    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSaleAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bar-chart", async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);
    const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1);
    const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);
    const priceRanges = await RoxilerData.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [{ $month: "$dateOfSale" }, selectedMonth] },
              { $lt: [{ $month: "$dateOfSale" }, selectedMonth + 1] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$price", 100] }, then: "0 - 100" },
                { case: { $lte: ["$price", 200] }, then: "101 - 200" },
                { case: { $lte: ["$price", 300] }, then: "201 - 300" },
                { case: { $lte: ["$price", 400] }, then: "301 - 400" },
                { case: { $lte: ["$price", 500] }, then: "401 - 500" },
                { case: { $lte: ["$price", 600] }, then: "501 - 600" },
                { case: { $lte: ["$price", 700] }, then: "601 - 700" },
                { case: { $lte: ["$price", 800] }, then: "701 - 800" },
                { case: { $lte: ["$price", 900] }, then: "801 - 900" },
                { case: { $gt: ["$price", 900] }, then: "901 - above" },
              ],
              default: "Unknown",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    const formattedPriceRanges = {};
    priceRanges.forEach((range) => {
      formattedPriceRanges[range._id] = range.count;
    });
    res.json(formattedPriceRanges);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/pie-chart", async (req, res) => {
  try {
    const selectedMonth = req.query.month;
    const categoryCounts = await RoxilerData.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, parseInt(selectedMonth)],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    const formattedCategoryCounts = {};
    categoryCounts.forEach((category) => {
      formattedCategoryCounts[category._id] = category.count;
    });
    res.json(formattedCategoryCounts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is runnning on port ${port}`);
});
