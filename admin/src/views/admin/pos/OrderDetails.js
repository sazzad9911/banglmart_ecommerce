import { Button } from "@chakra-ui/react";
import Header from "components/headers";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js/dist/html2pdf.min";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "api/api";
import { Loader } from "App";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "reducers/isLoading";
import { useAlert } from "react-alert";

export default function OrderDetails({ onClose }) {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    if (id) {
      getApi(`/order/get/${id}`)
        .then((res) => {
          setData(res.data.data);
          //console.log(res.data.data);
        })
        .catch((e) => {
          console.error(e.response.data.message);
        });
    }
  }, [id]);
  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(
      <View user={user} data={data} />
    );

    // const printElement = pdfJSX();

    var opt = {
      margin: 5,
      image: { type: "jpeg", quality: 0.98 },
      filename: "invoice.pdf",
    };
    html2pdf().set(opt).from(printElement).save();
  };
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="p-4 dark:text-white">
      <Header onClick={() => navigate(-1)} title="Order Details" />
      <div className="mb-6 flex justify-between">
        <div className="headLine">Invoice</div>
        <Button onClick={printHandler} colorScheme={"cyan"}>
          Download
        </Button>
      </div>
      <View user={user} data={data} />
      <div className="my-4 flex justify-between">
        <div className="mediumText flex">
          <span>Product Status: </span>{" "}
          <p
            style={{
              marginLeft: 5,
              color: color(data.status),
            }}
          >
            {data.status}
          </p>
        </div>
        <div className="flex items-center">
          {(data.status === "ACCEPTED" || data.status === "PENDING") && (
            <Button
              onClick={() => {
                dispatch(setLoading(true));
                getApi(`/order/reject/${data.id}`)
                  .then((res) => {
                    alert.success("Successful");
                    navigate(-1);
                    dispatch(setLoading(false));
                  })
                  .catch((e) => {
                    dispatch(setLoading(false));
                    alert.error(e.response.data.message);
                  });
              }}
              className="mr-2"
              colorScheme={"red"}
            >
              Cancel
            </Button>
          )}
          {data.status === "PENDING" && (
            <Button
              onClick={() => {
                dispatch(setLoading(true));
                getApi(`/order/accept/${data.id}`)
                  .then((res) => {
                    alert.success("Successful");
                    navigate(-1);
                    dispatch(setLoading(false));
                  })
                  .catch((e) => {
                    dispatch(setLoading(false));
                    alert.error(e.response.data.message);
                  });
              }}
              colorScheme={"linkedin"}
            >
              Accept
            </Button>
          )}
          {data.status === "ACCEPTED" && (
            <Button
              onClick={() => {
                dispatch(setLoading(true));
                getApi(`/order/courier/${data.id}`)
                  .then((res) => {
                    alert.success("Successful");
                    navigate(-1);
                    dispatch(setLoading(false));
                  })
                  .catch((e) => {
                    dispatch(setLoading(false));
                    alert.error(e.response.data.message);
                  });
              }}
              colorScheme={"linkedin"}
            >
              Send To Courier
            </Button>
          )}
          {data.status === "COURIER" && !data.paid && (
            <Button
              onClick={() => {
                dispatch(setLoading(true));
                getApi(`/order/paid/${data.id}`)
                  .then((res) => {
                    alert.success("Successful");
                    navigate(-1);
                    dispatch(setLoading(false));
                  })
                  .catch((e) => {
                    dispatch(setLoading(false));
                    alert.error(e.response.data.message);
                  });
              }}
              colorScheme={"linkedin"}
            >
              Paid Order
            </Button>
          )}
          {data.status === "COURIER" && data.paid && (
            <Button
              onClick={() => {
                dispatch(setLoading(true));
                getApi(`/order/complete/${data.id}`)
                  .then((res) => {
                    alert.success("Successful");
                    navigate(-1);
                    dispatch(setLoading(false));
                  })
                  .catch((e) => {
                    dispatch(setLoading(false));
                    alert.error(e.response.data.message);
                  });
              }}
              colorScheme={"linkedin"}
            >
              Complete Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
const View = ({ data, user }) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <p className="mediumText">
          <span>Platform: </span> Banglamart Ecommerce
        </p>
        <p className="mediumText">
          <span>Date: </span>
          {new Date(data.date).toDateString()}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center">
        <QRCode
          size={140}
          // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`https://banglamartecommerce.com.bd/productDetails/${data.product.id}`}
          //viewBox={`0 0 256 256`}
        />
        <div className="w-6" />
        <div className="">
          <div className="headLine mb-2">Product Details</div>
          <p className="mediumText">
            <span>Order Id: </span> {data.id}
          </p>
          <p className="mediumText">
            <span>Product Name: </span> {data.product.title}
          </p>
          <p className="mediumText">
            <span>Product Category: </span> {data.category.name}
          </p>
          <p className="mediumText">
            <span>Product Quantity: </span> {data.quantity} Pics
          </p>
          <p className="mediumText">
            <span>Product Size: </span> {data.sizes?.label} -{" "}
            {data.sizes?.value}
          </p>
          <div className="mediumText flex items-center">
            <span>Product Color: </span>{" "}
            <div
              className={`ml-4 h-5 w-5 rounded-full bg-[${data.colors?.value}]`}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 gap-4 lg:grid lg:grid-cols-2">
        <div className="my-4">
          <div className="headLine mb-2">Customer Details</div>
          <p className="mediumText">
            <span>Name: </span>
            {data.buyer.name}
          </p>
          <p className="mediumText">
            <span>Phone/Email: </span> {data.buyer.phone || data.buyer.email}
          </p>
          <p className="mediumText">
            <span>Shipping Address: </span> {data.address.union},{" "}
            {data.address.subDistrict}, {data.address.district},{" "}
            {data.address.division}
          </p>
        </div>
        <div className="my-4">
          <div className="headLine mb-2">Shop/Brand Details</div>
          <p className="mediumText">
            <span>Shop/Brand Name: </span>{" "}
            {data.store?.shopName || data.store?.brandName}
          </p>
          <p className="mediumText">
            <span>Phone/Email: </span> {user.user.email || user.user.phone}
          </p>
          <p className="mediumText">
            <span>Shop Address: </span>{" "}
            {data.store?.shopAddress || data.store?.brandAddress}
          </p>
        </div>
      </div>
      <hr />
      <div className="my-4 flex justify-between">
        <div>
          <p className="mediumText">
            <span>Payment Method: </span>{" "}
            {data.paymentMethod === "offline" ? "Cash on delivery" : "BKash"}
          </p>
          <p className="mediumText">
            <span>Payment Status: </span> {data.paid ? "Paid" : "UnPaid"}
          </p>
        </div>
        <div className="mediumText">
          <p>
            {" "}
            <span>Price: </span> {data.quantity} x{" "}
            {(data.totalAmount - data.deliveryFee) / data.quantity} ={" "}
            {data.totalAmount - data.deliveryFee} BDT
          </p>
          <p>
            <span>Delivery Fee: </span> {data.deliveryFee} BDT
          </p>
          <p>
            <span>Total Amount: </span> {data.totalAmount} BDT
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};
const color = (key) => {
  switch (key) {
    case "PENDING":
      return "orange";
    case "ACCEPTED":
      return "green";
    case "REJECTED":
      return "red";
    case "COMPLETED":
      return "blue";
    case "CANCELLED":
      return "#B03A2E";
    default:
      return "#5DADE2";
  }
};
