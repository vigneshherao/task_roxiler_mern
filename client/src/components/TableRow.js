import React from "react";

const TableRow = ({ item }) => {
  return (
    <>
      <tr className="text-center">
        <td className="border border-black font-thin">{item.id}</td>
        <td className="border border-black font-sans">{item.title.slice(0,30) +"..."}</td>
        <td className="border border-black font-thin">{item.description.slice(0, 20)}</td>
        <td className="border border-black font-thin">{Math.floor(item.price)}</td>
        <td className="border border-black font-thin">{item.category}</td>
        <td className="border border-black font-thin">{item.sold ? "true" : "false"}</td>
        <td className="border border-black font-thin">
          <img className="w-10 h-10 p-1" src={item.image}></img>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
