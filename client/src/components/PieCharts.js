import React from "react";
import { PieChart, Pie, Legend, Tooltip} from "recharts";
import { useState,useEffect } from "react";

const PieCharts = () => {


  const [pieinfo, setPieInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/pie-chart?month=7");
      const data = await response.json();
      const formattedData = Object.entries(data).map(([label, value]) => ({
        name: label,
        value: value
      }));
      setPieInfo(formattedData);
  };

  return (
    <div>
      <h2 className="font-bold text-center">Pie Charts</h2>
      <PieChart width={400} height={400}>
      <Pie
          data={pieinfo}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#87CEEB"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieCharts;
