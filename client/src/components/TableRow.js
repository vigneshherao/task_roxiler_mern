import React from "react";

const TableRow = ({ item }) => {
  return (
    <>
      <tr className="text-center">
        <td className="border border-black">{item.id}</td>
        <td className="border border-black">{item.title.slice(0, 10)}</td>
        <td className="border border-black">{item.description.slice(0, 10)}</td>
        <td className="border border-black">{item.price}</td>
        <td className="border border-black">{item.category}</td>
        <td className="border border-black">{item.sold ? "true" : "false"}</td>
        <td className="border border-black">
          <img className="w-10 h-10 p-1" src={item.image}></img>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
