import React, { useState, useEffect } from "react";
import Option from "./Option";

const Body = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://task-roxiler-mern.onrender.com/list");
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
      <Option />
    </div>
  );
};

export default Body;
