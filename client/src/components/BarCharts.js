import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const BarCharts = () => {
  const [barInfo, setBarInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/bar-chart?month=7");
    const datajson = await response.json();
    const dataArray = Object.entries(datajson);
    dataArray.sort(
      (a, b) => parseInt(a[0].split(" - ")[0]) - parseInt(b[0].split(" - ")[0])
    );
    setBarInfo(dataArray);
  };

  return (
    <div className="w-[60%] font-bold text-center ">
      <h2>Bar Chart</h2>
      <br />
      <BarChart
        width={400}
        height={400}
        data={barInfo}
      >
        <XAxis dataKey="0" />
        <YAxis />
        <Bar dataKey="1" fill="#87CEEB" />
      </BarChart>
    </div>
  );
};

export default BarCharts;
