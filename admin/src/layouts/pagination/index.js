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
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagination({ data, ROW, head, itemsPerPage,children,length,hidePage }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [currentPage, setCurrentPage] = useState(page&&!hidePage?parseInt(page):1);
  const totalPages = Math.ceil(length?length / itemsPerPage:data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const navigate=useNavigate()

  const currentData = data?.slice(startIndex, endIndex);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`${location.pathname}?page=${newPage}`)
  };
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blackAlpha">
        <TableCaption className="">
        {children&&(
          <div className="flex justify-end">
            {children}
          </div>
        )}
          <ResponsivePagination activeItemClassName="active paginationItems"
            current={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
          />
          
        </TableCaption>
        <Thead>{head}</Thead>
        <Tbody className=" z-20">
          {!length&&currentData?.map((doc, i) => (
            <ROW key={i} data={doc} index={data.indexOf(doc)} />
          ))}
          {length&&data?.map((doc, i) => (
            <ROW key={i} data={doc} index={((page?parseInt(page)-1:1-1)*10)+i} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
