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

export default function Pagination({ data, ROW, head,itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const currentData = data?.slice(startIndex, endIndex);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  return (
    <TableContainer >
      <Table  variant="striped" colorScheme="teal">
        <TableCaption className="">
          {currentPage>1&&(<Button onClick={()=>handlePageChange(currentPage-1)} className="mx-2" leftIcon={<GrFormPrevious />}>Prev</Button>)}
          {totalPages>currentPage&&(<Button onClick={()=>handlePageChange(currentPage+1)} className="mx-2" rightIcon={<GrFormNext />}>Next</Button>)}
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
