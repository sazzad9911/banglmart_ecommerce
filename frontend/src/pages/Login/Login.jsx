import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import {
  AiFillPhone,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { postApi } from "../../apis";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Login = () => {
  const { signIn, signInWithGoogle, setUserState, language } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const saveToken = (t) => {
    localStorage.removeItem("token");
    localStorage.setItem("token", t);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    signIn("/auth/signIn", formData, null)
      .then((res) => {
        saveToken(res.data.token);
        setIsLoading(false);
        setUserState(567);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogIn Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error?.response?.data?.message);
      });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const res = await signInWithGoogle();
      console.log(res.user);
      postApi(
        "/auth/thirdPartySignIn",
        {
          uid: res.user.uid,
          name: res.user.displayName,
          phone: res.user.phoneNumber,
          email: res.user.email,
        },
        null
      )
        .then((res) => {
          saveToken(res.data.token);
          setIsLoading(false);
          setUserState(657);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "LogIn Successful.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorMessage(error.response.data.message);
        });
    } catch (error) {
      setIsLoading(false);

      console.error(error.message);
    }
  };

  const [phone, setPhone] = useState('');
  const [phonePass, setPhonePass] = useState('');

 

  const handlePhoneLogin = () => {
    setErrorMessage(null);
    setIsLoading(true);
    signIn("/auth/sign-in-with-phone", {
      phone:phone,
      password:phonePass
    }, null)
      .then((res) => {
        saveToken(res.data.token);
        setIsLoading(false);
        setUserState(567546);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogIn Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
      });
      setPhone('')
      setPhonePass('')
  };

  return (
    <div className="flex items-center justify-center ">
      <Helmet>
        <title>Login | Banglamart E-commerce</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-BackgroundColor rounded-md shadow-lg m-4 ld:m-0">
        <h2 className="text-2xl font-semibold text-center mb-6">{language? 'Login':'লগইন'}</h2>
        {errorMessage && (
          <div
            className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
            role="alert"
          >
            <p>{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-2 text-TextColor">{language? 'Email':'ইমেইল'}</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full pr-10 mb-4"
            placeholder={language? "Enter your Email Address":'ইমেইল দিন'}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="mb-2 relative">
            <label className="block font-medium mb-2 text-TextColor">
            {language? 'Password':'পাসওয়ার্ড'}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-10"
              placeholder={language? "Enter your password":'পাসওয়ার্ড দিন'}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </motion.button>
          </div>
          <div className="mb-2 text-right">
            <Link
              to="/forgot-password"
              className="text-MainColor hover:text-MainColorHover hover:underline"
            >
               {language? 'Forgot Password?':'পাসওয়ার্ড ভুলে গেছেন?'}
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            type="submit"
            className="bg-MainColor mt-4 text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-bars loading-xs "></span>
            ) : (
              language? 'Login':'লগইন'
            )}
          </motion.button>
        </form>
        <div className="text-center">
          <div className="divider text-SubTextColor">OR</div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleGoogleLogin}
            className="bg-MainColor text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover mb-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              <div className="flex justify-center items-center">
                <AiOutlineGoogle className="text-2xl mr-1" />
                <h2>{language? 'Login With Google':'গুগল লগইন'}</h2>
              </div>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={onOpen}
            className="bg-MainColor text-CardColor shadow-lg shadow-MainColorHover rounded-md p-2 w-full hover:bg-MainColorHover"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              <div className="flex justify-center items-center">
                <AiFillPhone className="text-2xl mr-1" />
                <h2>{language? 'Login With Phone':'ফোন লগইন'}</h2>
              </div>
            )}
          </motion.button>
          {/* phone login modal  */}
          <div>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{language? 'Login using Phone Number':'ফোন লগইন'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>{language? 'Phone Number':'ফোন লগইন'}</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder={language? 'Phone Number':'ফোন লগইন'}
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>{language? 'Password':'পাসওয়ার্ড'}</FormLabel>
                    <Input
                    type="password"
                      value={phonePass}
                      onChange={(e)=>setPhonePass(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </FormControl>
                  {errorMessage && (
                    <div
                      className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
                      role="alert"
                    >
                      <p>{errorMessage}</p>
                    </div>
                  )}
                </ModalBody>

                <ModalFooter>
                 
                  <Button onClick={handlePhoneLogin} colorScheme="blue" mr={3}>
                    {isLoading ? (
                      <span className="loading loading-bars loading-xs "></span>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                  <Button onClick={onClose}>{language? 'Cancel':'বাতিল'}</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
          <p className="mt-10 text-SubTextColor">
          {language? 'Do not have an account?':'আপনার আকাউন্ট নেই?'} {" "}
            <Link
              to="/registration"
              className="text-MainColor hover:text-MainColorHover hover:underline"
            >
              <h3>{language? 'Register here':'রেজিস্ট্রেশন করুন'}</h3>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
