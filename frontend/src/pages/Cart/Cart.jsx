import { Link, useNavigate } from "react-router-dom";
import { PiSmileySadLight } from "react-icons/pi";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Radio, RadioGroup, Spinner, Stack, Tooltip } from "@chakra-ui/react";
import CartComponent from "../../components/CartComponent";
import { useLocation } from "react-router";
import { getApi, postApi } from "../../apis";
import Swal from "sweetalert2";

const Cart = () => {
  const { user, cart, language } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  const location = useLocation();
  const [promoCode, setPromoCode] = useState("");
  const [promoOffer, setPromoOffer] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberOffer, setMemberOffer] = useState(null);
  const [memberCode, setMemberCode] = useState("");
  const [promoId, setPromoId] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [orderToken, setOrderToken] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [image, setImage] = useState(null);
  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      // If the product ID is in the array, remove it.
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      setSubTotal(0);
      setDeliveryCharge(0);
    } else {
      // If the product ID is not in the array, add it.
      setSelectedProducts([...selectedProducts, productId]);
      setSubTotal(0);
      setDeliveryCharge(0);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleMemberCodeChange = (e) => {
    setMemberCode(e.target.value);
  };

  const applyPromoCode = (e) => {
    e.preventDefault();
    setPromoLoading(true);
    const token = localStorage.getItem("token");
    getApi(`/codes/verify-promo-code?code=${promoCode}`, token)
      .then((r) => {
        // console.log(r.data);
        setPromoOffer(r.data.code);
        setPromoId(r.data.code.id);
        setPromoLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Promo code invalid",
          showConfirmButton: false,
          timer: 1000,
        });
        setPromoLoading(false);
      });
  };

  const applyMemberCode = (e) => {
    e.preventDefault();
    setMemberLoading(true);
    const token = localStorage.getItem("token");
    getApi(`/codes/verify-member-code?code=${memberCode}`, token)
      .then((r) => {
        // console.log(r.data.code.id);
        setMemberOffer(r.data.code);
        setMemberId(r.data.code.id);
        setMemberLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Member code invalid",
          showConfirmButton: false,
          timer: 1000,
        });
        setMemberLoading(false);
      });
  };

  const handleCheckOut = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    postApi(
      "/order/check-out",
      {
        cartIds: selectedProducts,
        address: {
          division: user.address.division,
          district: user.address.district,
          subDistrict: user.address.subDistrict,
          union: user.address.union,
        },
        specialCodeId: memberId,
        promoId: promoId,
      },
      token
    )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setOrderToken(res.data.token);
        setSubTotal(res.data.subTotal);
        setDeliveryCharge(res.data.totalDeliveryFee);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };
  const [paymentName, setPaymentName] = React.useState("offline");

  const handleOrder = () => {
    setOrderLoading(true);
    const token = localStorage.getItem("token");
    postApi(
      "/order/create",
      {
        token: orderToken,
        paymentMethod: paymentName,
        redirectUrl: "https://banglamartecommerce.com.bd/track-order",
      },
      token
    )
      .then((res) => {
        setOrderLoading(false);

        // navigate(res.data.url);
        window.location.href = `${res.data.url}`;
      })
      .catch((err) => {
        setOrderLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err.message);
      });
  };
  return (
    <div className="container mx-auto m-4">
      <Helmet>
        <title>Cart | Banglamart E-commerce</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-CardColor md:col-span-2 h-min col-span-3">
          {user ? (
            cart ? (
              cart?.length > 0 ? (
                cart?.map((data, i) => (
                  <CartComponent
                    key={i}
                    data={data}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedProducts={selectedProducts}
                    setSubTotal={setSubTotal}
                    setDeliveryCharge={setDeliveryCharge}
                  ></CartComponent>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <PiSmileySadLight className="text-SubTextColor text-8xl"></PiSmileySadLight>
                  <h1 className="text-SubTextColor">
                    {language ? "No Product Added" : "পণ্য জুক্ত করেননি"}
                  </h1>
                </div>
              )
            ) : (
              <div className="flex justify-center items-center p-10">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            )
          ) : (
            <div className="flex justify-center items-center p-10">
              <h2 className="text-SubTextColor pl-5 md:pl-10 pr-5 md:pr-10 pt:3 md:pt-5 pb-3 md:pb-5">
                Please{" "}
                <Link
                  to="/login"
                  state={{ from: location }}
                  replace
                  className="text-MainColor font-bold cursor-pointer hover:underline"
                >
                  Login
                </Link>{" "}
                to see your cart{" "}
              </h2>
            </div>
          )}
        </div>

        <div className="rounded-md p-3 bg-CardColor md:col-span-1 col-span-3 h-min">
          {/* apply code section  */}
          <div className="mb-4 relative">
            <form onSubmit={applyPromoCode}>
              <div className="relative">
                <label className="block text-SubTextColor text-sm font-bold mb-1">
                  {language ? "Apply Promo Code" : "প্রমো কোড ব্যাবহার করুন"}
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-SubTextColor leading-tight focus:outline-MainColor"
                  placeholder={language ? "Enter Promo Code" : "প্রমো কোড দিন"}
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  required
                />
                {promoOffer ? (
                  promoOffer?.percentage ? (
                    <p className="text-TextColor">
                      Discount: {promoOffer.offer}%
                    </p>
                  ) : (
                    <p className="text-TextColor">
                      Discount: {promoOffer.offer}tk
                    </p>
                  )
                ) : (
                  <p className="text-xs text-[#ff6868]">
                    {language
                      ? "*Apply promo code to get a discount"
                      : "প্রমো কোড ব্যাবহার করে ডিসকাউন্ট নিন"}
                  </p>
                )}
                {promoLoading ? (
                  <div
                    type="submit"
                    className="text-sm flex justify-center items-center absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                  >
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    type="submit"
                    className="text-sm absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                  >
                    {language ? "Apply" : "আবেদন"}
                  </motion.button>
                )}
              </div>
            </form>

            <form onSubmit={applyMemberCode}>
              <div className="relative">
                <label className="block text-SubTextColor text-sm font-bold mb-1">
                  {language ? "Apply Member Code" : "মেম্বার কোড ব্যাবহার করুন"}
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-SubTextColor leading-tight focus:outline-MainColor"
                  placeholder="Enter Coupon Code"
                  value={memberCode}
                  onChange={handleMemberCodeChange}
                  required
                />

                {memberOffer ? (
                  memberOffer?.percentage ? (
                    <p className="text-TextColor">
                      Discount: {memberOffer.offer}%
                    </p>
                  ) : (
                    <p className="text-TextColor">
                      Discount: {memberOffer.offer}tk
                    </p>
                  )
                ) : (
                  <p className="text-xs text-[#ff6868]">
                    {language
                      ? "*Apply member code to get a discount"
                      : "মেম্বার কোড ব্যাবহার করে ডিসকাউন্ট নিন"}
                  </p>
                )}
                {memberLoading ? (
                  <div
                    type="submit"
                    className="text-sm flex justify-center items-center absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                  >
                    <span className="loading loading-spinner loading-sm"></span>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    type="submit"
                    className="text-sm absolute text-CardColor top-[25px] right-0 rounded-r-full bg-MainColor p-2"
                  >
                    {language ? "Apply" : "আবেদন"}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
          <div></div>
          {/* buy section */}
          <div className="">
            {user?.address?.division ? (
              <div className="text-SubTextColor bg-BackgroundColor rounded p-2">
                <h1 className="text-MainColor">
                  {language
                    ? "Your Delivery Address:"
                    : "আপনার ডেলিভারি ঠিকানা:"}
                </h1>
                <h2>{`${user.address.union}, ${user.address.subDistrict}, ${user.address.district}, ${user.address.division} | Phone: ${user.phone}`}</h2>
                <Link
                  to="/addDeliveryAddress"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.8 }}
                  className="bg-TextColor text-center p-1 block rounded mt-1 shadow-sm shadow-BackgroundColor hover:shadow-TextColor"
                >
                  <p className="text-CardColor">
                    {language ? "Add Another Address" : "অন্য ঠিকানা যোগ করুন"}
                  </p>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center p-2 bg-BackgroundColor rounded">
                <p className="text-TextColor">
                  {language
                    ? "Please add your address"
                    : "আপনার ঠিকানা যোগ করুন"}
                </p>
                <Link
                  to="/addDeliveryAddress"
                  className="bg-TextColor pl-4 pr-4 p-1 rounded mt-1 shadow-sm shadow-BackgroundColor hover:shadow-TextColor"
                >
                  <p className="text-CardColor ">
                    {language ? "Add Address" : "ঠিকানা যোগ করুন"}
                  </p>
                </Link>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <h3 className="text-SubTextColor">Subtotal</h3>
            <h3 className="text-TextColor">
              <span className="text-xs text-SubTextColor font-mono mr-2">
                (vat included)
              </span>
              {subTotal} ৳
            </h3>
          </div>
          <div className="flex justify-between mt-2">
            <h3 className="text-SubTextColor">Delivery Charge</h3>
            <h3 className="text-TextColor">(+) {deliveryCharge} ৳</h3>
          </div>
          <div className="flex justify-between mt-2">
            <h3 className="text-SubTextColor">Total</h3>
            <h1 className="text-TextColor">
              {parseFloat(subTotal) + parseFloat(deliveryCharge)} ৳
            </h1>
          </div>
          {selectedProducts.length > 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleCheckOut}
              className="w-full mt-2 shadow-md shadow-SubTextColor hover:shadow-TextColor"
            >
              <div className="flex justify-center items-center bg-TextColor  p-1 rounded-sm ">
                {loading ? (
                  <h3 className="text-CardColor font-semibold">
                    <span className="loading loading-spinner loading-xs"></span>
                  </h3>
                ) : (
                  <h3 className="text-CardColor font-semibold">
                    {language
                      ? "Click To Calculate amount "
                      : "হিসাব গণনা করতে ক্লিক করুন"}
                    ({selectedProducts.length})
                  </h3>
                )}
              </div>
            </motion.button>
          ) : (
            <div className="flex justify-center w-full mt-2 shadow-md shadow-SubTextColor hover:shadow-TextColor items-center bg-TextColor  p-1 rounded-sm cursor-not-allowed">
              <Tooltip label="Please select product" aria-label="A tooltip">
                <h2 className="text-CardColor">
                  {" "}
                  {language ? "Select Product To Checkout" : "পণ্যে ক্লিক করুন"}
                </h2>
              </Tooltip>
            </div>
          )}
          {selectedProducts.length && subTotal > 0 ? (
            orderLoading ? (
              <div className="py-2 px-2 mt-4 shadow-md shadow-SubTextColor flex justify-center items-center rounded-full bg-TextColor w-full p-1 text-CardColor">
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : user?.address?.subDistrict ? (
              <div>
                <div className="mt-2">
                  <h1 className="text-center mb-2 text-[#ff5b5b] ">
                    {language
                      ? "Select Your payment method"
                      : "আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন"}
                  </h1>
                  <RadioGroup onChange={setPaymentName} value={paymentName}>
                    <Stack direction="column">
                      <Radio size={"lg"} value="offline">
                        <img
                          className="rounded-lg h-10"
                          src="https://i.ibb.co/djdf4tk/Cashondeliveryjpgjpg-15946486664.jpg"
                          alt=""
                        />
                      </Radio>
                      <Radio size={"lg"} value="bkash">
                        <img
                          className="rounded-lg h-10"
                          src="https://i.ibb.co/tYcp9LT/bkash-payment-logo.jpg"
                          alt=""
                        />
                      </Radio>
                      <Radio size={"lg"} value="amarpay">
                        <img
                          className="rounded-lg h-10"
                          src="https://i.ibb.co/XjK9Wt8/aamarpay-logo.jpg"
                          alt=""
                        />
                      </Radio>
                      <Radio size={"lg"} value="">
                        <div className="p-4 border border-[#ff8484]">
                          <p className="text-[#ff3434]">
                            বিকাশে পেমেন্ট করুন ০১৭১৩৩৩৭৮২৫
                          </p>
                          <label className="block text-SubTextColor text-sm font-bold mb-1">
                            {language ? "Transaction ID" : "লেনদেন নাম্বার"}{" "}
                            <span className="text-[#ff3434]">*</span>
                          </label>
                          <input
                            type="text"
                            className="shadow appearance-none border rounded-full py-2 px-3 text-SubTextColor leading-tight focus:outline-MainColor"
                            placeholder="Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            required
                          />
                          <label className="block text-SubTextColor text-sm font-bold mb-1">
                            {language ? "Photo" : "ছবি"}
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className=" w-60"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleOrder}
                  className="py-2 px-2 mt-4 shadow-md shadow-SubTextColor hover:shadow-TextColor rounded-full bg-TextColor w-full"
                >
                  <h1 className="text-CardColor">
                    {language ? "Order Now" : "অর্ডার করুন"}
                  </h1>
                </motion.button>
              </div>
            ) : (
              <Link
                to="/addDeliveryAddress"
                className="py-2 px-2 mt-4 shadow-md shadow-SubTextColor hover:shadow-TextColor rounded-full bg-TextColor w-full"
              >
                <p className="text-CardColor ">
                  {language
                    ? "Add Address to Order"
                    : "অর্ডারে ঠিকানা যোগ করুন"}
                </p>
              </Link>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
