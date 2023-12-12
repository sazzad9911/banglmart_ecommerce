import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OrderCart from "./OrderCart";
import OrderDetails from "./OrderDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getApi } from "api/api";
import CardPagination from "layouts/pagination/CardPagination";
import { Loader } from "App";
import NoData from "components/NoData";

export default function POS() {
  const [list, setList] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((s) => s.user);
  useEffect(() => {
    if (user) {
      getApi(`/order/seller`, user.token)
        .then((res) => {
          setList(res.data.data);
        })
        .catch((e) => {
          console.error(e.response.data.message);
        });
    }
  }, []);
  // Swal.fire({
  //   title: "Do you want to delete the item?",
  //   showCancelButton: true,
  //   confirmButtonText: "Ok",
  //   denyButtonText: `Don't save`,
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     dispatch(setLoading(true));
  //     deleteApi(`/codes/delete-promo-code?promoCodeId=${d.data.id}`,user.token)
  //       .then((res) => {
  //         dispatch(setLoading(false));
  //         setChange(res.data)
  //         Swal.fire("Deleted!", "", "success");
  //       })
  //       .catch((e) => {
  //         dispatch(setLoading(false));
  //         Swal.fire(e.response.data.message, "", "info");
  //       });
  //   }
  // });
  if (!list) {
    return <Loader />;
  }

  return (
    <Tabs className="dark:text-white">
      <TabList>
        <Tab>
          On going
          {list.filter((d) => d.offerPrice === 0 && d.status === "PENDING")
            .length > 0 && (
            <Badge className="ml-2" colorScheme="green">
              New
            </Badge>
          )}
        </Tab>
        <Tab>Bargaining
        {list.filter((d) => d.offerPrice != 0 && d.status === "PENDING")
            .length > 0 && (
            <Badge className="ml-2" colorScheme="green">
              New
            </Badge>
          )}
        </Tab>
        <Tab>Completed</Tab>
        <Tab>Cancelled</Tab>
        <Tab>Refund</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CardPagination
            data={list.filter(
              (d) =>
                d.offerPrice === 0 &&
                d.status != "COMPLETED" &&
                d.status != "REFUND" &&
                d.status != "CANCELLED"&&d.status!="REJECTED"
            )}
            itemsPerPage={9}
            ROW={(d) => (
              <OrderCart
                onClick={() => navigate(`${location.pathname}/${d.data.id}`)}
                data={d.data}
                key={d.index}
              />
            )}
          />
          {list.filter(
            (d) =>
              d.offerPrice === 0 &&
              d.status != "COMPLETED" &&
              d.status != "REFUND" &&
              d.status != "CANCELLED"
          ).length === 0 && <NoData />}
        </TabPanel>
        <TabPanel>
          <CardPagination
            data={list.filter((d) => d.offerPrice != 0)}
            itemsPerPage={9}
            ROW={(d) => (
              <OrderCart
                onClick={() => navigate(`${location.pathname}/${d.data.id}`)}
                data={d.data}
                key={d.index}
              />
            )}
          />
          {list.filter((d) => d.offerPrice != 0).length === 0 && <NoData />}
        </TabPanel>
        <TabPanel>
          <CardPagination
            data={list.filter((d) => d.status === "COMPLETED")}
            itemsPerPage={9}
            ROW={(d) => (
              <OrderCart
                onClick={() => navigate(`${location.pathname}/${d.data.id}`)}
                data={d.data}
                key={d.index}
              />
            )}
          />
          {list.filter((d) => d.status === "COMPLETED").length === 0 && (
            <NoData />
          )}
        </TabPanel>
        <TabPanel>
          <CardPagination
            data={list.filter((d) => d.status === "CANCELLED"||d.status==="REJECTED")}
            itemsPerPage={9}
            ROW={(d) => (
              <OrderCart
                onClick={() => navigate(`${location.pathname}/${d.data.id}`)}
                data={d.data}
                key={d.index}
              />
            )}
          />
          {list.filter((d) => d.status === "CANCELLED").length === 0 && (
            <NoData />
          )}
        </TabPanel>
        <TabPanel>
          <CardPagination
            data={list.filter((d) => d.status === "REFUND")}
            itemsPerPage={9}
            ROW={(d) => (
              <OrderCart
                onClick={() => navigate(`${location.pathname}/${d.data.id}`)}
                data={d.data}
                key={d.index}
              />
            )}
          />
          {list.filter((d) => d.status === "REFUND").length === 0 && <NoData />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
