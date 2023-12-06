import { useLocation } from "react-router-dom";
import FlashSaleBanner from "../../components/FlashSaleBanner";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import Skeleton from "react-loading-skeleton";
import EmptyContent from "../../components/EmptyContent";
import { Helmet } from "react-helmet";
// import { motion } from "framer-motion";
import { getApi } from "../../apis";
import {
  Box,
  Button,
  Center,
  Grid,
  SkeletonText,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { Paginated } from "@makotot/paginated";

const VariousProductsPage = () => {
  const [products, setProducts] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get("data");
  const route = JSON.parse(decodeURIComponent(encodedData));
  // console.log(products);
  //   const url = "https://api.banglamartecommerce.com.bd";
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    getApi(route, null)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [route]);

  const itemsPerPage = 24; // Number of items per page
  const [currentPage, updateCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    const totalPage = Math.ceil(products?.length / itemsPerPage);
    setTotalPage(totalPage);
  }, [products]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products?.slice(startIndex, endIndex);
  return (
    // <div className="">
    //   <Helmet>
    //     <title>Products | Banglamart E-commerce</title>
    //   </Helmet>
    //   <div className="container mx-auto">
    //     <FlashSaleBanner></FlashSaleBanner>
    //   </div>
    //   <div className="container mx-auto mt-4 p-1 lg:p-0">
    //     <div className="grid grid-cols-5 gap-4">
    //       <div className="hidden lg:block">
    //         <div className="flex justify-center items-center border border-MainColor mb-4 p-1">
    //           <h1>
    //             <AiFillFilter className="text-MainColor mr-1" />
    //           </h1>
    //           <h1 className="text-MainColor">Filters</h1>
    //         </div>
    //         <div>
    //           <FilterCart title="filter by color"></FilterCart>
    //           <FilterCart title="filter by Brand"></FilterCart>
    //           <FilterCart title="filter by Vendors"></FilterCart>
    //         </div>
    //       </div>
    //       <div className="col-span-5 lg:col-span-4">
    //         <div className="flex justify-between items-center mb-4">
    //           <motion.button
    //             whileHover={{ scale: 1.1 }}
    //             whileTap={{ scale: 0.8 }}
    //             className=" lg:hidden flex justify-center items-center border border-MainColor p-1"
    //           >
    //             <h1>
    //               <AiFillFilter className="text-MainColor mr-1 " />
    //             </h1>
    //             <h1 className="text-MainColor">Filters</h1>
    //           </motion.button>
    //           <h2 className="text-TextColor">
    //             Total Products: {products?.length}
    //           </h2>
    //         </div>
    //         <div className="mt-4 ">
    //           <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
    //             {products ? (
    //               products.length > 0 ? (
    //                 currentProducts.map((product) => (
    //                   <ProductCart
    //                     product={product}
    //                     key={product.id}
    //                   ></ProductCart>
    //                 ))
    //               ) : (
    //                 <EmptyContent text="No Product Available!"></EmptyContent>
    //               )
    //             ) : (
    //               <Box padding="6" boxShadow="lg" bg="#FAD7A0">
    //                 <Skeleton height="200px" />
    //                 <SkeletonText
    //                   mt="4"
    //                   noOfLines={3}
    //                   spacing="4"
    //                   skeletonHeight="2"
    //                 />
    //               </Box>
    //             )}
    //           </div>
    //           {/* Pagination */}
    //           <div className=" m-4">
    //             {totalPage ? (
    //               <Paginated
    //                 currentPage={currentPage}
    //                 totalPage={totalPage}
    //                 siblingsSize={1}
    //                 boundarySize={1}
    //               >
    //                 {({
    //                   pages,
    //                   currentPage,
    //                   hasPrev,
    //                   hasNext,
    //                   getFirstBoundary,
    //                   getLastBoundary,
    //                   isPrevTruncated,
    //                   isNextTruncated,
    //                 }) => (
    //                   <Grid
    //                     width="100%"
    //                     justifyContent="center"
    //                     alignItems="center"
    //                     gridTemplateColumns="min-content 1fr min-content"
    //                     gridGap={2}
    //                   >
    //                     <Stack direction="row">
    //                       {hasPrev() && (
    //                         <Button
    //                           size="sm"
    //                           leftIcon={
    //                             <AiOutlineDoubleLeft className="text-[14px]" />
    //                           }
    //                           colorScheme="blue"
    //                           onClick={() => updateCurrentPage(currentPage - 1)}
    //                         >
    //                           Prev
    //                         </Button>
    //                       )}
    //                     </Stack>
    //                     <Center>
    //                       <Stack direction="row">
    //                         {getFirstBoundary().map((boundary) => (
    //                           <Button
    //                             size="sm"
    //                             key={boundary}
    //                             colorScheme="blue"
    //                             variant="outline"
    //                             onClick={() => updateCurrentPage(boundary)}
    //                           >
    //                             {boundary}
    //                           </Button>
    //                         ))}
    //                         {isPrevTruncated && <span>...</span>}
    //                         {pages.map((page) => {
    //                           return page === currentPage ? (
    //                             <Button
    //                               size="sm"
    //                               key={page}
    //                               colorScheme="blue"
    //                               variant="solid"
    //                             >
    //                               {page}
    //                             </Button>
    //                           ) : (
    //                             <Button
    //                               size="sm"
    //                               key={page}
    //                               colorScheme="blue"
    //                               variant="outline"
    //                               onClick={() => updateCurrentPage(page)}
    //                             >
    //                               {page}
    //                             </Button>
    //                           );
    //                         })}

    //                         {isNextTruncated && <span>...</span>}
    //                         {getLastBoundary().map((boundary) => (
    //                           <Button
    //                             size="sm"
    //                             key={boundary}
    //                             colorScheme="blue"
    //                             variant="outline"
    //                             onClick={() => updateCurrentPage(boundary)}
    //                           >
    //                             {boundary}
    //                           </Button>
    //                         ))}
    //                       </Stack>
    //                     </Center>

    //                     <Stack direction="row">
    //                       {hasNext() && (
    //                         <Button
    //                           size="sm"
    //                           rightIcon={
    //                             <AiOutlineDoubleRight className="text-" />
    //                           }
    //                           colorScheme="blue"
    //                           onClick={() => updateCurrentPage(currentPage + 1)}
    //                         >
    //                           Next
    //                         </Button>
    //                       )}
    //                     </Stack>
    //                   </Grid>
    //                 )}
    //               </Paginated>
    //             ) : (
    //               <div className="flex justify-center">
    //                 <Spinner />
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="">
      <Helmet>
        <title>Products | Banglamart E-commerce</title>
      </Helmet>
      <div className="container mx-auto">
        <FlashSaleBanner></FlashSaleBanner>
      </div>
      <div className="container mx-auto mt-4 p-1 lg:p-0">
        <div className="mt-4 ">
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {products ? (
              products.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCart product={product} key={product.id}></ProductCart>
                ))
              ) : (
                <EmptyContent text="No Product Available!"></EmptyContent>
              )
            ) : (
              array.map((i) => (
                <Box key={i} padding="6" boxShadow="lg" bg="#FAD7A0">
                  <Skeleton height="200px" />
                  <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ))
            )}
          </div>
          {/* Pagination */}
          <div className=" m-4">
            {totalPage ? (
              <Paginated
                currentPage={currentPage}
                totalPage={totalPage}
                siblingsSize={1}
                boundarySize={1}
              >
                {({
                  pages,
                  currentPage,
                  hasPrev,
                  hasNext,
                  getFirstBoundary,
                  getLastBoundary,
                  isPrevTruncated,
                  isNextTruncated,
                }) => (
                  <Grid
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    gridTemplateColumns="min-content 1fr min-content"
                    gridGap={2}
                  >
                    <Stack direction="row">
                      {hasPrev() && (
                        <Button
                          size="sm"
                          leftIcon={
                            <AiOutlineDoubleLeft className="text-[14px]" />
                          }
                          colorScheme="blue"
                          onClick={() => updateCurrentPage(currentPage - 1)}
                        >
                          Prev
                        </Button>
                      )}
                    </Stack>
                    <Center>
                      <Stack direction="row">
                        {getFirstBoundary().map((boundary) => (
                          <Button
                            size="sm"
                            key={boundary}
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => updateCurrentPage(boundary)}
                          >
                            {boundary}
                          </Button>
                        ))}
                        {isPrevTruncated && <span>...</span>}
                        {pages.map((page) => {
                          return page === currentPage ? (
                            <Button
                              size="sm"
                              key={page}
                              colorScheme="blue"
                              variant="solid"
                            >
                              {page}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              key={page}
                              colorScheme="blue"
                              variant="outline"
                              onClick={() => updateCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}

                        {isNextTruncated && <span>...</span>}
                        {getLastBoundary().map((boundary) => (
                          <Button
                            size="sm"
                            key={boundary}
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => updateCurrentPage(boundary)}
                          >
                            {boundary}
                          </Button>
                        ))}
                      </Stack>
                    </Center>

                    <Stack direction="row">
                      {hasNext() && (
                        <Button
                          size="sm"
                          rightIcon={<AiOutlineDoubleRight className="text-" />}
                          colorScheme="blue"
                          onClick={() => updateCurrentPage(currentPage + 1)}
                        >
                          Next
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                )}
              </Paginated>
            ) : (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariousProductsPage;
