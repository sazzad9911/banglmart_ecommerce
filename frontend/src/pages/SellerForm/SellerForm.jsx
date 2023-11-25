import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar } from "@chakra-ui/react";
import { FcAddImage } from "react-icons/fc";
import Swal from "sweetalert2";
import { postApi } from "../../apis";
const SellerForm = () => {
  const { user, setUserState } = useContext(AuthContext);
  // console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [shopName, setShopName] = useState(null);
  const [shopAddress, setShopAddress] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure? Or Check Informations",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = new FormData();
        image && data.append("logo", image);
        data.append("shopName", shopName);
        data.append("shopAddress", shopAddress);

        const token = localStorage.getItem("token");
        setIsLoading(true);
        postApi("/store/request-seller", data, token)
          .then(() => {
            // console.log(r);
            setIsLoading(false);
            setUserState(546);
            Swal.fire("Congrats!", "Your request has been sent.", "success");
          })
          .catch((error) => {
            setIsLoading(false);
            setErrorMessage(error);
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 lg:w-[800px]">
      <Helmet>
        <title>Seller Form | Banglamart E-commerce</title>
      </Helmet>
      <div className="">
        <h1 className="font-semibold mb-4">Seller Request Form</h1>
        <form
          className="bg-white p-6 rounded shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            {user?.role === 2 ? (
              <div className="relative">
                <Avatar
                  size="xl"
                  name="Logo"
                  src={image && URL.createObjectURL(image)}
                />
                <input
                  readOnly
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <label className="absolute bottom-[2px] right-2 bg-CardColor rounded-full p-[2px] cursor-pointer border-2 border-CardColor">
                  <p>
                    <FcAddImage className="text-[18px]" />
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <Avatar
                  size="xl"
                  name="Logo"
                  src={image && URL.createObjectURL(image)}
                  onClick={() => {
                    document.getElementById("profile-picture-input").click();
                  }}
                />
                <input
                  required
                  type="file"
                  id="profile-picture-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label
                  htmlFor="profile-picture-input"
                  className="absolute bottom-[2px] right-2 bg-CardColor rounded-full p-[2px] cursor-pointer hover:border hover:border-MainColor border-2 border-CardColor"
                >
                  <p>
                    <FcAddImage className="text-[18px]" />
                  </p>
                </label>
              </div>
            )}
          </div>
          {user?.role === 2 ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">Shop Name</label>
                <input
                  type="text"
                  name="name"
                  value={shopName}
                  className="w-full p-2 rounded shadow-md"
                  placeholder="Enter your shop name"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input
                readOnly
                  type="text"
                  name="house"
                  value={shopAddress}
                  className="w-full p-2 rounded shadow-md"
                  placeholder="Enter your full shop address here"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block mb-1">Shop Name</label>
                <input
                  type="text"
                  name="name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
                  placeholder="Enter your shop name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input
                required
                  type="text"
                  name="house"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
                  placeholder="Enter your full shop address here"
                />
              </div>
            </div>
          )}

          {errorMessage && (
            <div
              className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
              role="alert"
            >
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="flex flex-col justify-center mt-10">
            {user?.role === 2 ? (
              <h1 className="text-[#ee5757]">Be A Seller Requested!</h1>
            ) : (
              ""
            )}
            {user?.role === 2 ? (
              <button
                disabled
                className="bg-MainColorHover text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full mt-1"
              >
                Go "Profile {">"} Admin Panel" for check
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                type="submit"
                className="bg-MainColor text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover mt-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-bars loading-md"></span>
                ) : (
                  "Be A Seller Request"
                )}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
