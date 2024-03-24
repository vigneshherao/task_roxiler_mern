const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const RoxilerData = require("./models/roxilerModel");
const cors = require('cors')
require('dotenv').config()

app.use(cors())


const dbUrl = process.env.ATLASDBURL;
main().then(()=>console.log("db connected")).catch(err => console.log(err));


async function main() {

  await mongoose.connect(dbUrl);

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



app.get("/list",async(req,res)=>{
    try {
        const lists =await RoxilerData.find();
        res.json(lists)
    } catch (error) {
        
    }
})


app.get("/list/month", async (req, res) => {
  try {
      // Parse query parameter for selected month (e.g., 'month=11' for November)
      const selectedMonth = parseInt(req.query.month);
      console.log(selectedMonth);
      
      // Calculate start and end dates for the selected month
      const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1); // Note: Month is zero-based
      const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);

      // Fetch the list of items sold in the selected month
      const items = await RoxilerData.find({
          dateOfSale: { $gte: startDate, $lte: endDate }
      });

      res.json(items);
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
  }
});




app.get('/statistics', async (req, res) => {
  try {
    // Parse query parameter for selected month (e.g., 'month=11' for November)
    const selectedMonth = parseInt(req.query.month);
    console.log(selectedMonth)
    
    // Calculate start and end dates for the selected month
    const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1); // Note: Month is zero-based
    const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);

    // Fetch total sale amount of selected month
    const totalSaleAmount = await RoxilerData.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: '$price' }
        }
      }
    ]);

    // Fetch total number of sold items of selected month
    const totalSoldItems = await RoxilerData.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: true
    });

    // Fetch total number of not sold items of selected month
    const totalNotSoldItems = await RoxilerData.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: false
    });

    // Send the statistics as JSON response
    res.json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSaleAmount : 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get("/bar-chart", async (req, res) => {
    try {
        const selectedMonth =parseInt(req.query.month); // Assuming the month is set directly to 11 (November)
    
        // Construct the date range for the selected month
        const startDate = new Date(new Date().getFullYear(), selectedMonth - 1, 1); // Start of selected month
        const endDate = new Date(new Date().getFullYear(), selectedMonth, 0); // End of selected month
    
        // Aggregate to group items by price range and count them
        const priceRanges = await RoxilerData.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $gte: [{ $month: "$dateOfSale" }, selectedMonth] }, // Match month greater than or equal to selected month
                            { $lt: [{ $month: "$dateOfSale" }, selectedMonth + 1] } // Match month less than next month
                        ]
                    }
                }
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
                                { case: { $gt: ["$price", 900] }, then: "901 - above" }
                            ],
                            default: "Unknown"
                        }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);
    
        // Format the response
        const formattedPriceRanges = {};
        priceRanges.forEach(range => {
            formattedPriceRanges[range._id] = range.count;
        });
    
        // Return the price ranges and corresponding counts as JSON
        res.json(formattedPriceRanges);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
  });



  app.get("/pie-chart", async (req, res) => {
    try {
      const selectedMonth = req.query.month; // Change this line to use req.query.month
    
      // Aggregate to group items by category and count them
      const categoryCounts = await RoxilerData.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$dateOfSale" }, parseInt(selectedMonth)] // Convert to integer if needed
            }
          }
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
    
      // Format the response
      const formattedCategoryCounts = {};
      categoryCounts.forEach(category => {
        formattedCategoryCounts[category._id] = category.count;
      });
    
      // Return the category counts as JSON
      res.json(formattedCategoryCounts);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
app.listen(port,()=>{
    console.log(`Server is runnning on port ${port}`);
})