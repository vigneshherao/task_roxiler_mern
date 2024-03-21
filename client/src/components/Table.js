import React from "react";
import Option from "./Option";
import Pagination from "./Pagination";
import Statitics from './Statitics'

const Table = () => {
  return (
    <div>
      <Option />
      <div className="m-auto">
        <table className="table-auto w-full border border-black bg-yellow-100 mt-3">
          <thead>
            <tr>
              <th className="border border-black">ID</th>
              <th className="border border-black">Title</th>
              <th className="border border-black">Description</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Category</th>
              <th className="border border-black">Sold</th>
              <th className="border border-black">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
            </tr>
            <tr>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
            </tr>
            <tr>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
              <td className="border border-black">Malcolm Lockyer</td>
              <td className="border border-black">1961</td>
              <td className="border border-black">The Sliding</td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
      <Statitics/>
    </div>
  );
};

export default Table;
