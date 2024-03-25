import React from "react";
import { PieChart, Pie, Legend, Tooltip} from "recharts";

const PieCharts = ({data}) => {
  return (
    <div>
      <h2 className="font-bold text-center">Pie Charts</h2>
      <PieChart width={400} height={400}>
      <Pie
          data={data}
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
