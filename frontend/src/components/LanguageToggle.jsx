
import { useTranslation } from "react-i18next";
import { AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const LanguageToggle = () => {
  const {language, setLanguage} = useContext(AuthContext);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(!language);
  };

  return (
    <>
      {language ? (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-1 "
          onClick={() => handleLanguageChange("bn")}
        >
          <div className="flex items-center">
            <p className=" text-SubTextColor">English</p>
            <AiOutlineRight className="text-[12px] text-SubTextColor hover:text-TextColor" />
            <p className="text-SubTextColor ">বাংলা</p>
          </div>
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-1"
          onClick={() => handleLanguageChange("en")}
        >
          <div className="flex items-center">
            <p className="text-SubTextColor">বাংলা</p>
            <AiOutlineRight
              color=""
              className="text-[12px] text-SubTextColor hover:text-TextColor"
            />
            <p className="text-SubTextColor">English</p>
          </div>
        </motion.button>
      )}
    </>
  );
};

export default LanguageToggle;
