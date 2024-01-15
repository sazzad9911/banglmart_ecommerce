import { Button, Td, Th, Tr } from "@chakra-ui/react";
import { deleteApi } from "api/api";
import { getApi } from "api/api";
import { url } from "api/authApi";
import NoData from "components/NoData";
import FloatButton from "components/floatButton";
import Pagination from "layouts/pagination";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setLoading } from "reducers/isLoading";
import Swal from "sweetalert2";

export default function CampaignProduct() {
  const { id } = useParams();
  const [productList, setProductList] = useState();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector((state) => state.isLoading);
  console.log(`${location.pathname.split("/")[1]}/campaign/add/${id}`);
  useEffect(() => {
    getApi(`/campaign/products/${id}`).then((res) => {
      setProductList(res.data.data);
    });
  }, [id, isLoading]);
  //console.log(id);

  return (
    <div className="p-4 dark:text-white">
      <div className="text-xl font-semibold">Product List</div>
      <div>
        {productList?.length > 0 ? (
          <Pagination
            data={productList}
            itemsPerPage={3}
            head={
              <Tr>
                <Th>No</Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Total</Th>
                <Th>Sale</Th>
                <Th>Delete</Th>
              </Tr>
            }
            ROW={(e) => {
              return (
                <Tr>
                  <Td>{e.index + 1}</Td>
                  <Td>
                    <img
                      className="h-8 w-8"
                      crossOrigin="anonymous"
                      alt="edf"
                      src={`${url}${e.data.product.thumbnail}`}
                    />
                  </Td>
                  <Td>{e.data.product.title}</Td>
                  <Td>{e.data.total}</Td>
                  <Td>{e.data.sale}</Td>
                  <Td className="text-[#da4646]">
                    {e.data.userId === user.user.id ? (
                      <Button
                        onClick={() => {
                          dispatch(setLoading(true));
                          deleteApi(
                            `/campaign/products/delete/${e.data.id}`,
                            user.token
                          )
                            .then((res) => {
                              Swal.fire(
                                "Success",
                                "Product deleted successfully",
                                "success"
                              );
                              dispatch(setLoading(false));
                            })
                            .catch((e) => {
                              Swal.fire(
                                "Ops!",
                                "Some thing went wrong",
                                "error"
                              );
                              dispatch(setLoading(false));
                            });
                        }}
                      >
                        <AiFillDelete color="#F00" size={30} />
                      </Button>
                    ) : (
                      <div>No Access</div>
                    )}
                  </Td>
                </Tr>
              );
            }}
          />
        ) : (
          <div className="mt-10">
            <NoData />
          </div>
        )}
      </div>
      <FloatButton
        onClick={() => {
          navigate(`/${location.pathname.split("/")[1]}/${location.pathname.split("/")[2]}/campaign/add/${id}`);
        }}
      />
    </div>
  );
}
