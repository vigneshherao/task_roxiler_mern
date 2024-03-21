import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import TableRow from "./TableRow";

const Table = ({ data }) => {
  const headings = [
    "ID",
    "Title",
    "Description",
    "Price",
    "Category",
    "Sold",
    "Image",
  ];

  return (
    <div>
      <div className="m-auto">
        <table className="table-auto w-full border border-black bg-cyan-100 mt-3">
          <thead>
            <tr>
              {headings.map((head) => (
                <th className="border border-black">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return <TableRow item={item} />;
            })}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
