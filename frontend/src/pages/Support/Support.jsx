import emailjs from "@emailjs/browser";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { postApi } from "../../apis";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../providers/AuthProvider";

const initialFormState = {
  title: "",
  description: "",
  name: "",
  phone: "",
  email: "",
};

const Support = () => {
  const { language } = useContext(AuthContext);
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormState);
  const [send, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const phoneNumberPattern = /^01[3-9][0-9]{8}$/;

    if (name === "phone" && !phoneNumberPattern.test(value)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSent(true);
    postApi("/support/create", formData, null)
      .then(() => {
        setSent(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Message Sent. Thanks For Your Feedback!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setSent(false);
        console.error(error.response.data.message);
      });

    const templateParams = {
      from_name: formData.name,
      user_email: formData.email,
      message: formData.description,
    };

    emailjs
      .send(
        "service_qeov5k3",
        "template_7gm40zm",
        templateParams,
        "1tcM1ckhC1nBgyawA"
      )
      .then((result) => {
        console.log(result.text);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        alert("Message Sent. Thanks For Your Feedback!");
        setSent(false);
      })
      .catch((error) => {
        setSent(false);
        console.error(error.text);
      });

    setFormData(initialFormState);
  };
  const handlePhoneClick = () => {
    window.location.href = 'tel:+8801713337752';
  };
  return (
    <div className="">
      <div className="container mx-auto p-4 mt-4 lg:mt-12 pb-12 bg-CardColor">
        <h4 className="text-2xl text-center font-bold mb-8 text-SubTextColor">
        {t("contactUs.contactUs")}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className=" mb-4 text-SubTextColor"> {t("contactUs.branch")}</h1>
            <div className="flex items-center mb-2 text-blue-900">
              <AiOutlinePhone className=" mr-2 text-SubTextColor" />
              <p onClick={handlePhoneClick} className="text-SubTextColor cursor-pointer">{t("header.number")}</p>
            </div>
            <div className="flex items-center mb-2 text-blue-900">
              <AiOutlineMail className=" mr-2 text-SubTextColor" />
              <a
                href="mailto:banglamartecommerce@gmail.com"
                className="text-TextColor cursor-pointer"
              >
                <p>banglamartecommerce@gmail.com</p>
              </a>
            </div>
            <div className="flex items-center mb-2 text-blue-900">
              <BiCurrentLocation className=" mr-2 text-SubTextColor" />
              <p className="text-SubTextColor">
              {t("contactUs.address")}
              </p>
            </div>
            <div className="mt-6 lg:mt-10">
              <h1 className=" text-SubTextColor">{t("location")}</h1>
              <div className="mt-2">
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.4853462408682!2d89.22863257600258!3d25.754527808900363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e3334011188799%3A0x41b90776fb5f041!2sSJS%20Kallyan%20Foundation!5e0!3m2!1sen!2sbd!4v1685954381956!5m2!1sen!2sbd"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <h1 className=" mb-4 text-SubTextColor">{t("headOffice")}</h1>
            <div className="flex items-center mb-2 text-blue-900">
              <AiOutlinePhone className=" mr-2 text-SubTextColor" />
              <p onClick={handlePhoneClick} className="text-SubTextColor cursor-pointer">{t("header.number")}</p>
            </div>
            <div className="flex items-center mb-2 text-blue-900">
              <AiOutlineMail className=" mr-2 text-SubTextColor" />
              <a
                href="mailto:banglamartecommerce@gmail.com"
                className="text-TextColor cursor-pointer"
              >
                <p>banglamartecommerce@gmail.com</p>
              </a>
            </div>
            <div className="flex items-center mb-2 text-blue-900">
              <BiCurrentLocation className=" mr-2 text-SubTextColor" />
              <p className="text-SubTextColor">
              {t("contactUs.address")}
              </p>
            </div>
            <div className="mt-6 lg:mt-10">
              {/* Send us a message section */}
              <h1 className=" mb-4 text-SubTextColor">{t("sendUsMsg")}</h1>
              <form onSubmit={sendEmail}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={`${ language ? 'Enter Your Name':'আপনার নাম'} `}
                  required
                  className="bg-BackgroundColor rounded-md w-full p-2 mb-4"
                />
                <div>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={`${ language ? 'Your Phone Number':'আপনার নাম্বার'} `}
                    required
                    className="bg-BackgroundColor rounded-md w-full p-2 "
                  />
                  {phoneError && <p className="text-[#df4040]">{phoneError}</p>}
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={`${ language ? 'Your Email':'আপনার ইমেইল'} `}
                  className="bg-BackgroundColor rounded-md w-full p-2 mb-4 mt-4"
                />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={`${ language ? 'Title':'উদ্দেশ্য'} `}
                  required
                  className="bg-BackgroundColor rounded-md w-full p-2 mb-4"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={`${ language ? 'Description':'বর্ণনা'} `}
                  className="bg-BackgroundColor rounded-md w-full p-2 mb-4 "
                  rows="4"
                ></textarea>
                {phoneError == "Invalid phone number" ? (
                  <button
                    disabled
                    className="text-CardColor btn btn-info rounded"
                  >
                   {t('send')}
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    type="submit"
                    className="text-CardColor btn btn-info rounded"
                  >
                    {send ? "Sending.." : ` ${t('send')}`}
                  </motion.button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
