import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import Statitics from "./Statitics";
import PieCharts from "./PieCharts";
import BarCharts from "./BarCharts";
import { values } from "../utils/values";
import { useCallback } from "react";

const Option = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("3");
  const [tableData, setTableData] = useState([]);
  const [pieinfo, setPieInfo] = useState([]);
  const [statics, setStatics] = useState([]);
  const [barInfo, setBarInfo] = useState([]);

  useEffect(() => {
    fetchChartData();
    fetchData();
    fetchBarData();
    fetchStatitics();
  }, []);

  const fetchChartData = async () => {
    const response = await fetch(`https://task-roxiler-mern.onrender.com/list`);
    const data = await response.json();
    setTableData(data);
  };

  const filteredData = tableData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toString().includes(searchText.toLowerCase())
  );

  const filterDataList = async (month) => {
    try {
      const response = await fetch(
        `https://task-roxiler-mern.onrender.com/list/month?month=${month}`
      );
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (month) => {
    const response = month
      ? await fetch(
          `https://task-roxiler-mern.onrender.com/pie-chart?month=${month}`
        )
      : await fetch(`https://task-roxiler-mern.onrender.com/pie-chart?month=3`);
    const data = await response.json();
    const formattedData = Object.entries(data).map(([label, value]) => ({
      name: label,
      value: value,
    }));
    setPieInfo(formattedData);
  };

  const fetchBarData = async (month) => {
    const response = month
      ? await fetch(`https://task-roxiler-mern.onrender.com/bar-chart?month=${month}`)
      : await fetch("https://task-roxiler-mern.onrender.com/bar-chart?month=3");
    const datajson = await response.json();
    const dataArray = Object.entries(datajson);
    dataArray.sort(
      (a, b) => parseInt(a[0].split(" - ")[0]) - parseInt(b[0].split(" - ")[0])
    );
    setBarInfo(dataArray);
  };

  const fetchStatitics = async (month) => {
    const response = month
      ? await fetch(`https://task-roxiler-mern.onrender.com/statistics?month=${month}`)
      : await fetch("https://task-roxiler-mern.onrender.com/statistics?month=3");
    const datajson = await response.json();
    setStatics(datajson);
  };

  const handleSelectChange = useCallback(
    async (e) => {
      const selectedValue = e.target.value;
      setSelectedMonth(selectedValue);
      await filterDataList(selectedValue);
      await fetchData(selectedValue);
      await fetchBarData(selectedValue);
      await fetchStatitics(selectedValue);
    },
    [filterDataList, fetchData, fetchBarData, fetchStatitics]
  );

  return (
    <div>
      <div className="flex justify-between px-5 py-5">
        <div>
          <input
            className="p-3 bg-slate-100 rounded-full text-center text-gray-700 font-semibold"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search transaction"
          />
        </div>
        <div>
          <label
            className="p-3 bg-slate-100 text-center text-gray-700 font-semibold"
            htmlFor="months"
          >
            Select Month
          </label>
          <select
            name="months"
            id="months"
            className="p-3 bg-slate-100 text-center text-gray-700 font-semibold"
            value={selectedMonth}
            onChange={(e) => handleSelectChange(e)}
          >
            {values.map((val) => {
              return (
                <option onChange={() => {}} key={val.id} value={val.id}>
                  {val.month}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <CustomTable data={filteredData} />
      <Statitics data={statics} />
      <div className="flex flex-wrap mt-10 justify-between">
        <PieCharts data={pieinfo} />
        <BarCharts data={barInfo} />
      </div>
    </div>
  );
};

export default Option;
