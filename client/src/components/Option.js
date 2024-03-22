import React, { useEffect } from "react";
import { useState } from "react";

const Option = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("3");

  useEffect(()=>{
    fecthChart();
  },[])


  const fecthChart =async ()=>{
    const data =await fetch("http://localhost:3000/bar-chart?month="+selectedMonth);
    const jsonData =await data.json();
    console.log(jsonData);
  }

  return (
    <div className="flex justify-between px-5 py-5">
      <div>
        <input
          className="p-3 bg-slate-100 rounded-full text-center text-gray-700 font-semibold"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search transcation"
        ></input>
      </div>
      <div>
        <label
          className="p-3 bg-slate-100 text-center text-gray-700 font-semibold"
          htmlFor="cars"
        >
          Select Month
        </label>
        <select
          name="cars"
          id="cars"
          className="p-3 bg-slate-100 text-center text-gray-700 font-semibold"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
        >
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>
    </div>
  );
};

export default Option;
