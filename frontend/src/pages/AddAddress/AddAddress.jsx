import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const url = "https://api.banglamartecommerce.com.bd";
const AddDeliveryAddressForm = () => {
  const { user, setUserState, updateUser, language } = useContext(AuthContext);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [subDistricts, setSubDistricts] = useState([]);
  const [unions, setUnions] = useState([]);
  useEffect(() => {
    const fetchDivisionsData = async () => {
      try {
        const response = await fetch("divisions.json");
        const data = await response.json();
        setDivisions(data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisionsData();
  }, []);

  useEffect(() => {
    const fetchDistrictsData = async () => {
      try {
        const response = await fetch("districts.json");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistrictsData();
  }, []);

  useEffect(() => {
    const fetchSubDistrictsData = async () => {
      try {
        const response = await fetch("subDistricts.json");
        const data = await response.json();
        setSubDistricts(data);
      } catch (error) {
        console.error("Error fetching sub-districts:", error);
      }
    };

    fetchSubDistrictsData();
  }, []);

  useEffect(() => {
    const fetchUnionsData = async () => {
      try {
        const response = await fetch("unions.json");
        const data = await response.json();
        setUnions(data);
      } catch (error) {
        console.error("Error fetching unions:", error);
      }
    };

    fetchUnionsData();
  }, []);

  const sortedAddressName = (array, selected) => {
    return array?.filter((d) => d.name.match(selected))[0]?.id;
  };
  // console.log(sortedAddressName(divisions, user.address.division));

  const [selectedDivision, setSelectedDivision] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("1");
  const [selectedUnion, setSelectedUnion] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState(user?.gender);
  const [birthDate, setBirthDate] = useState(user?.birthday);
  const [image, setImage] = useState(null);

  const sortedAddress = (array, selected) => {
    return array?.filter((d) => d.id.match(selected))[0].name;
  };
  useEffect(() => {
    setSelectedDivision(sortedAddressName(divisions, user?.address?.division));
    setSelectedDistrict(sortedAddressName(districts, user?.address?.district));
    setSelectedSubDistrict(
      sortedAddressName(subDistricts, user?.address?.subDistrict)
    );
    setSelectedUnion(sortedAddressName(unions, user?.address?.union));
    setFullName(user?.name);
    setPhone(user?.phone);
    setFullAddress(user?.address?.fullAddress);
  }, [user, user?.address, divisions, districts, subDistricts, unions]);

  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: `phone: ${phone} fullAddress: ${fullAddress}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't update`,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = new FormData();
        image && data.append("image", image);
        data.append("name", fullName);
        data.append(
          "address",
          JSON.stringify({
            division: sortedAddress(divisions, selectedDivision),
            district: sortedAddress(districts, selectedDistrict),
            subDistrict: sortedAddress(subDistricts, selectedSubDistrict),
            union: sortedAddress(unions, selectedUnion),
            fullAddress: fullAddress,
          })
        );
        data.append("gender", gender);
        data.append("phone", phone);
        data.append("birthday", birthDate);

        const token = localStorage.getItem("token");
        setIsLoading(true);
        updateUser("/auth/update", data, token)
          .then((r) => {
            setIsLoading(false);
            setUserState(r);
            Swal.fire("Updated!", "", "success");
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error.message);
            setErrorMessage(error.response.data.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="container mx-auto p-4 lg:w-[800px]">
      <Helmet>
        <title>Add address | Banglamart E-commerce</title>
      </Helmet>
      <div className="">
        <h1 className="font-semibold mb-4">
          {language
            ? "Update your delivery profile"
            : "আপনার ডেলিভারি প্রোফাইল আপডেট করুন"}
        </h1>
        <form
          className="bg-white p-6 rounded shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              {user?.image ? (
                <Avatar
                  size="xl"
                  name={user?.name}
                  src={`${url}${user?.image}`}
                  onClick={() => {
                    document.getElementById("profile-picture-input").click();
                  }}
                />
              ) : (
                <Avatar
                  size="xl"
                  name={user?.name}
                  src={image && URL.createObjectURL(image)}
                  onClick={() => {
                    document.getElementById("profile-picture-input").click();
                  }}
                />
              )}

              <input
                type="file"
                id="profile-picture-input"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <label
                htmlFor="profile-picture-input"
                className="absolute bottom-1 right-2 bg-TextColor text-CardColor rounded-full p-1 cursor-pointer hover:border hover:border-BorderColor border-2 border-CardColor"
              >
                <p>
                  <FaUserEdit />
                </p>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              {language ? "Full Name" : "পুরো নাম"}
            </label>
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="border border-MainColor p-2 m-2">
            <h2 className="text-center">Delivery Address</h2>
            <div className="relative mb-4">
              <label className="block mb-1">
                {language ? "Division" : "বিভাগ"}
              </label>
              <select
                required
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md pr-10"
              >
                <option value="">
                  {language ? "Select Division" : "বিভাগ দিন"}
                </option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative mb-4">
              <label className="block mb-1">
                {language ? "District" : "জেলা"}
              </label>
              <select
                required
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md pr-10"
              >
                <option value="">
                  {language ? "Select District" : "জেলা দিন"}
                </option>
                {districts
                  .filter((d) => d.divisionId.match(selectedDivision))
                  .map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative mb-4">
              <label className="block mb-1">
                {language ? "Sub District" : "উপ জেলা"}
              </label>
              <select
                required
                value={selectedSubDistrict}
                onChange={(e) => setSelectedSubDistrict(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md pr-10"
              >
                <option value="">
                  {language ? "Select Sub District" : "উপ জেলা দিন"}
                </option>
                {subDistricts
                  .filter((sd) => sd.districtId.match(selectedDistrict))
                  .map((subDistrict) => (
                    <option key={subDistrict.id} value={subDistrict.id}>
                      {subDistrict.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative mb-4">
              <label className="block mb-1">
                {language ? "Union" : "ইউনিঅন"}
              </label>
              <select
                required
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md pr-10"
              >
                <option value="">
                  {language ? "Union Union" : "ইউনিঅন দিন"}
                </option>
                {unions
                  .filter((u) => u.subDistrictId.match(selectedSubDistrict))
                  .map((union) => (
                    <option key={union.id} value={union.id}>
                      {union.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">
                {language ? "Full Address" : "পুরো ঠিকানা"}
              </label>
              <textarea
                type="text"
                name="name"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
                placeholder={language ? "Full address here" : "পুরো ঠিকানা দিন"}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">
                {language ? "Phone Number" : "মোবাইল নামবার"}
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
                placeholder={language ? "Phone Number" : "মোবাইল নামবার"}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male" ? true : false}
                  onChange={() => setGender("Male")}
                  className="mr-1"
                />
                {language ? "Male" : "ছেলে"}
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female" ? true : false}
                  onChange={() => setGender("Female")}
                  className="mr-1"
                />
                {language ? "Female" : "মেয়ে"}
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              {language ? "Birth Date" : "জন্মদিন"}
            </label>
            <input
              type="date"
              name="birthday"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 rounded focus:outline-none focus:border focus:border-BorderColor shadow-md"
              placeholder="Enter postal code"
            />
          </div>
          {errorMessage && (
            <div
              className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
              role="alert"
            >
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              type="submit"
              className="bg-MainColor text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover mt-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : language ? (
                "Update Profile"
              ) : (
                "প্রোফাইল আপডেট"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryAddressForm;
