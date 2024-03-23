import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";

const Option = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("3");
  const [tableData, setTableData] = useState([]);

  const values = [
    { id: 1, month: "Jan" },
    { id: 2, month: "Feb" },
    { id: 3, month: "Mar" },
    { id: 4, month: "Apr" },
    { id: 5, month: "May" },
    { id: 6, month: "Jun" },
    { id: 7, month: "Jul" },
    { id: 8, month: "Aug" },
    { id: 9, month: "Sep" },
    { id: 10, month: "Oct" },
    { id: 11, month: "Nov" },
    { id: 12, month: "Dec" }
  ];
  

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    const response = await fetch(`http://localhost:3000/list`);
    const data = await response.json();
    setTableData(data);
  };

  const filteredData = tableData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.price.toString().includes(searchText.toLowerCase())
  );

  const filterDataList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/list/month?month=${selectedMonth}`);
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {
              values.map((val)=>{
                return <option key={val.id} value={val.id}>{val.month}</option>
              })
            }

          </select>
        </div>
      </div>
      <CustomTable data={filteredData} />
    </div>
  );
};

export default Option;
