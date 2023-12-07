import { useParams } from "react-router-dom";
import FilterCart, { FilterCartData } from "../../components/FilterCart";
import FlashSaleBanner from "../../components/FlashSaleBanner";
import {
  AiFillFilter,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { FaArrowsAltH } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import EmptyContent from "../../components/EmptyContent";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Paginated } from "@makotot/paginated";
import {
  Button,
  Center,
  Grid,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
} from "@chakra-ui/react";

const Products = () => {
  const [options, setOptions] = useState(null);
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [products, setProducts] = useState(null);
  const { query, id } = useParams();

  // Set initial minimum and maximum values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const url = "https://banglamartecommerce.com.bd";
  useEffect(() => {
    const fetchOptionProducts = async () => {
      try {
        const response = await fetch(
          `${url}/product/search?query=${query}&byBrad=${
            brand ? brand : ""
          }&byOption=${id}&byColor=${color ? color : ""}&byPriceFrom=${
            minValue ? minValue : ""
          }&byPriceTo=${maxValue ? maxValue : ""}`
        );
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching instructor classes:", error);
      }
    };

    fetchOptionProducts();
  }, [query, brand, color, minValue, maxValue]);

  useEffect(() => {
    const fetchOption = async () => {
      try {
        const response = await fetch(
          `${url}/product/searchFilter?query=${query}&byOption=${id}`
        );
        const data = await response.json();
        setMin(data.minPrice);
        setMax(data.maxPrice);
        setMinValue(data.minPrice);
        setMaxValue(data.maxPrice);
        setOptions(data);
      } catch (error) {
        console.error("Error fetching instructor classes:", error);
      }
    };
    fetchOption();
  }, [query]);
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

  // Handle changes to the slider values
  const handleChange = (newValues) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
  };
  console.log(minValue, maxValue);
  return (
    <div className="">
      <Helmet>
        <title>Products | Banglamart E-commerce</title>
      </Helmet>
      <div className="container mx-auto">
        <FlashSaleBanner></FlashSaleBanner>
      </div>
      <div className="container mx-auto mt-4 p-1 lg:p-0">
        <div className="grid grid-cols-5 gap-4">
          <div className="hidden lg:block">
            <div className="flex justify-center items-center border border-MainColor mb-4 p-1">
              <h1>
                <AiFillFilter className="text-MainColor mr-1" />
              </h1>
              <h1 className="text-MainColor">Filters</h1>
            </div>
            {/* price range start  */}
            {min === 43955677 || (
              <div className="bg-CardColor p-2 pl-6 pr-6 rounded-lg mb-2 border border-BorderColor">
                <h3 className="text-center mb-1 font-semibold">Price Range</h3>
                <RangeSlider
                  aria-label={["min", "max"]}
                  defaultValue={[minValue, maxValue]}
                  min={min}
                  max={max}
                  onChange={handleChange}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <div className="flex justify-evenly items-center">
                  <div className="p-1">{minValue}৳</div>
                  <FaArrowsAltH></FaArrowsAltH>
                  <div>{maxValue}৳</div>
                </div>
              </div>
            )}

            {/* price range end  */}
            {options ? (
              <div>
                {options.color?.length > 0 && (
                  <FilterCart
                    data={options.color}
                    title="filter by color"
                    Child={(e) => (
                      <FilterCartData
                        value={e.data.label === color ? true : false}
                        onClick={() => {
                          setColor((v) =>
                            v === e.data.label ? undefined : e.data.label
                          );
                        }}
                        title={e.data.label}
                      />
                    )}
                  ></FilterCart>
                )}
                {options.brand?.length > 0 && (
                  <FilterCart
                    data={options.brand}
                    Child={(e) => (
                      <FilterCartData
                        value={e.data.id === brand ? true : false}
                        onClick={() => {
                          setBrand((v) =>
                            v === e.data.id ? undefined : e.data.id
                          );
                        }}
                        title={e.data.brandName}
                      />
                    )}
                    title="filter by Brand"
                  ></FilterCart>
                )}
                {options.seller?.length > 0 && (
                  <FilterCart
                    data={options.seller}
                    Child={(e) => <FilterCartData title={e.data.sellerName} />}
                    title="filter by Seller"
                  ></FilterCart>
                )}
                {options.size?.length > 0 && (
                  <FilterCart
                    data={options.size}
                    Child={(e) => (
                      <FilterCartData
                        title={`${e.data.label}: ${e.data.value}`}
                      />
                    )}
                    title="filter by Size"
                  />
                )}
                {/* 
                <FilterCart
                  data={options.option}
                  Child={(e) => <FilterCartData title={`${e.data.name}`} />}
                  title="filter by Option"
                ></FilterCart> */}
              </div>
            ) : (
              <div>
                <FilterCart />
                <FilterCart />
                <FilterCart />
                <FilterCart />
                <FilterCart />
              </div>
            )}
          </div>
          <div className="col-span-5 lg:col-span-4">
            <div className="flex justify-between items-center mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className=" lg:hidden flex justify-center items-center border border-MainColor p-1"
              >
                <h1>
                  <AiFillFilter className="text-MainColor mr-1 " />
                </h1>
                <h1 className="text-MainColor">Filters</h1>
              </motion.button>
              <h2 className="text-TextColor">
                Total Products: {products?.length}
              </h2>
            </div>
            <div className="mt-4 ">
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                {products ? (
                  products.length > 0 ? (
                    currentProducts.map((product) => (
                      <ProductCart
                        product={product}
                        key={product.id}
                      ></ProductCart>
                    ))
                  ) : (
                    <EmptyContent text="No Product Available!"></EmptyContent>
                  )
                ) : (
                  <SkeletonTheme baseColor="#5dade2" highlightColor="#FAD7A0">
                    <h3>
                      <Skeleton count={1} width={200} height={250} />
                    </h3>
                  </SkeletonTheme>
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
                              rightIcon={
                                <AiOutlineDoubleRight className="text-" />
                              }
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
        </div>
      </div>
    </div>
  );
};

export default Products;
