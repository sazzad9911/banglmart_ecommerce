import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import "react-responsive-pagination/themes/classic.css";
import ResponsivePagination from "react-responsive-pagination";

export default function Pagination({ data, ROW, head, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blackAlpha">
        <TableCaption className="">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </TableCaption>
        <Thead>{head}</Thead>
        <Tbody>
          {currentData?.map((doc, i) => (
            <ROW key={i} data={doc} index={data.indexOf(doc)} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
