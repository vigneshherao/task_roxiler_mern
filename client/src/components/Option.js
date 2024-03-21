import React from "react";

const Option = () => {
  return (
    <div className="flex justify-between px-5 py-5">
      <div>
        <input
          className="p-3 bg-slate-100 rounded-full text-center text-gray-700 font-semibold"
          type="text"
          placeholder="Search transcation"
        ></input>
      </div>
      <div>
        <label className="p-3 bg-slate-100 text-center text-gray-700 font-semibold" for="cars">Select Month</label>
        <select name="cars" id="cars" className="p-3 bg-slate-100 text-center text-gray-700 font-semibold">
          <option value="volvo">Jan</option>
          <option value="saab">Feb</option>
          <option value="mercedes">Mar</option>
          <option value="audi">Apr</option>
        </select>
      </div>
    </div>
  );
};

export default Option;
