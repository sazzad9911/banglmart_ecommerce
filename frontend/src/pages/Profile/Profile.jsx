import { Avatar, Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useContext } from "react";
import {
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaEnvelopeOpenText,
  FaGenderless,
  FaUserAstronaut,
  FaPhoneAlt,
  FaCoins,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { user, language } = useContext(AuthContext);
  // console.log(user);
  const url = "https://api.banglamartecommerce.com.bd";

  return (
    <div className="pt-4 bg-BackgroundColor flex items-center justify-center m-1 lg:m-0">
      {user ? (
        <div className="bg-CardColor shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3 p-4 text-SubTextColor">
          <div className="text-center">
            <Avatar size="xl" name={user?.name} src={`${url}${user?.image}`} />
            <h1 className="text-2xl font-semibold">{user?.name || "N/A"}</h1>
          </div>
          <div className="flex justify-center items-center">
            <FaCoins className="mr-1 text-[18px] text-[#ffdb3a]" />
            <h3>{language ? "Your available coin:" : "আপনার কয়েন আছে:"}</h3>
            <h1 className="ml-1 text-[#ffdb3a]">{user?.coin}</h1>{" "}
          </div>
          {user?.coin <= 0 && (
            <p className="text-[#f35454] text-center text-xs">
              {language ? "Buy product and earn COIN" : "পণ্য কিনুন কয়েন জিতুন"}
            </p>
          )}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <FaUserAstronaut className="mr-2" />
              <span>{user?.name || "N/A"}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelopeOpenText className="mr-2" />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" />
              <span>{user?.phone || "N/A"}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaBirthdayCake className="mr-2" />
              <span>{user?.birthday || "N/A"}</span>
            </div>

            <div className="flex items-center mb-2">
              <FaGenderless className="mr-2" />
              <span>{user?.gender || "N/A"}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              {user?.address?.division ? (
                <span>{`${user?.address?.union || "N/A"}, ${
                  user?.address?.subDistrict || "N/A"
                }, ${user?.address?.district || "N/A"}, ${
                  user?.address?.division || "N/A"
                }`}</span>
              ) : (
                <span>N/A</span>
              )}
            </div>
            {user?.address?.union ? (
              <span></span>
            ) : (
              <p className="text-[#f35454]"> {language ? "*Please Update Your Profile" : "আপনার প্রোফাইল আপডেট করুন"}</p>
            )}
          </div>

          <div className="flex justify-center">
            <Link
              className="bg-MainColor text-CardColor py-2 px-4 rounded-md mt-4 hover:bg-MainColorHover shadow-md shadow-MainColor "
              to="/addDeliveryAddress"
            >
              {language ? "Update Profile" : "প্রোফাইল আপডেট"}
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </div>
      )}
    </div>
  );
};

export default Profile;
