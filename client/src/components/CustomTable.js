import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import TableRowComponent from "./TableRow";

const CustomTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
    <div className="m-auto">
      <TableContainer component={Paper} className="mt-3 bg-sky-50">
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headings.map((head, index) => (
                <TableCell key={index} className="border border-black font-bold" style={{ backgroundColor: 'skyblue' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: 'lightblue' }}>
            {slicedData.map((item) => (
              <TableRowComponent item={item} key={item.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 60]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CustomTable;
