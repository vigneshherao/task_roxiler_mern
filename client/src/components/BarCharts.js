import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const BarCharts = ({ data }) => {
  return (
    <div className="w-[60%] font-bold text-center ">
      <h2>Bar Chart</h2>
      <br />
      <BarChart width={400} height={400} data={data}>
        <XAxis dataKey="0" />
        <YAxis />
        <Bar dataKey="1" fill="#87CEEB" />
      </BarChart>
    </div>
  );
};

export default BarCharts;
