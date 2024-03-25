import React from "react";

const Statitics = ({ data }) => {
  return (
    <div className="m-16 w-[60%] sm:w-[30%]">
      <h3 className="font-bold">Statitics - June</h3>
      <div className=" bg-yellow-100 py-2 px-4 mt-2 rounded-xl">
        <div className="flex justify-between">
          <p>Total Sale</p>
          <p>{data.totalSaleAmount}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Sold Item</p>
          <p>{data.totalSoldItems}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Not Sold Item</p>
          <p>{data.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default Statitics;
