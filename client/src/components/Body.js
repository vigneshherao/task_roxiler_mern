import React, { useState, useEffect } from "react";
import Statitics from "./Statitics";
import Option from "./Option";
import BarCharts from "./BarCharts";
import PieCharts from "./PieCharts";

const Body = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://task-roxiler-mern-vignesh.onrender.com/list");
    const datajson = await response.json();
    setInfo(datajson);
  };

  return (
    <div className="w-[100%] md:w-[80%]">
      <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center m-auto">
        <h4 className="text-center font-bold text-gray-700">
          Transaction Dashboard
        </h4>
      </div>
      <Option/>
      <Statitics data={info} />
      <div className="flex flex-wrap mt-10"> 
      <BarCharts/>
      <PieCharts/>
      </div>
    </div>
  );
};

export default Body;
