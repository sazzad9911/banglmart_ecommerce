import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { getApi } from "../../apis";
import BrandShopCart from "../../components/BrandShopCart";
import ProductCart from "../../components/ProductCart";
import Skeleton from "react-loading-skeleton";
import {
  Box,
  Button,
  Center,
  Grid,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { Paginated } from "@makotot/paginated";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const BrandProductsPage = () => {
  const { language } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get("data");
  const data = JSON.parse(decodeURIComponent(encodedData));
  const [productData, setProductData] = useState(null);
  // console.log(productData);
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18];
  const [productDataLength, setProductDataLength] = useState(null);
  // console.log(productDataLength);

  const itemsPerPage = 24; // Number of items per page
  const [currentPage, updateCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setProductData(null);
    getApi(
      `/product/get-brand-product?brandId=${data?.id}&page=${currentPage}&perPage=24`,
      token
    )
      .then((res) => {
        setProductDataLength(res.data.length);
        setProductData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  useEffect(() => {
    const totalPage = Math.ceil(productDataLength / itemsPerPage);
    setTotalPage(totalPage);
  }, [productDataLength]);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const currentProducts = productData?.slice(startIndex, endIndex);
  return (
    <div className="container mx-auto bg-CardColor lg:mt-4 mt-2">
      <Helmet>
        <title>Brand Product | Banglamart E-commerce</title>
      </Helmet>
      <div className="flex justify-center border-b-[1px] border-b-BorderColor p-4">
        <BrandShopCart data={data}></BrandShopCart>
      </div>
      <div className="p-4">
        <h1 className="text-SubTextColor pb-4">{language?'Products:':'পণ্য'}</h1>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {productData ? (
            productData?.length > 0 ? (
              productData?.map((product, i) => (
                <ProductCart product={product} key={i}></ProductCart>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center mt-1">
                <PiSmileySadLight className="text-SubTextColor text-4xl"></PiSmileySadLight>
                <h1 className="text-SubTextColor">{language?'No Product Available':'পণ্য নেই'}</h1>
              </div>
            )
          ) : (
            array.map((i) => {
              return (
                <Box key={i} padding="6" boxShadow="lg" bg="#FAD7A0">
                  <Skeleton height="200px" />
                  <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              );
            })
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
              {/* <Spinner /> */}
              ....
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandProductsPage;
