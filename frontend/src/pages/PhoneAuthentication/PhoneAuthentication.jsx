import { useState, useEffect, useContext } from "react";
import Countdown from "react-countdown";
import { postApi } from "../../apis";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignUpWithPhone = () => {
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { setUserState,language } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isCountdownCompleted, setIsCountdownCompleted] = useState(true);
  const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
  const [isReSendButtonEnabled, setIsReSendButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    const phoneNumberRegex = /^01[3-9]\d{8}$/;
    const newIsValid = phoneNumberRegex.test(newPhoneNumber);
    setPhoneNumber(newPhoneNumber);
    setIsValid(newIsValid);
  };

  // Function to send OTP
  const sendOtp = () => {
    const customTitle = `${phoneNumber}`;
    setErrorMessage(null);
    Swal.fire({
      title: customTitle,
      text: "Phone Number Ok?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send OTP",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        postApi("/auth/send-otp", { phone: phoneNumber }, null)
          .then((response) => {
            localStorage.setItem("otpToken", response.data.token);
            setIsOtpSent(true);
            setIsLoading(false);
            setIsReSendButtonEnabled(true);
            Swal.fire("User Created", "Welcome to our family!", "success");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.message);
            setIsLoading(false);
          });
      }
    });
  };
  const handlePhoneSignUp = () => {
    setErrorMessage("");

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,}$/;

    if (
      name.trim() === "" ||
      phoneNumber.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      // Empty fields error
      setErrorMessage("All fields are required");
    } else if (password.length < 6) {
      // Password length error
      setErrorMessage("Password must be at least 6 characters long");
    } else if (!passwordRegex.test(password)) {
      // Password requirements error
      setErrorMessage(
        "Password must contain at least one capital letter, one special character, and one digit"
      );
    } else if (password !== confirmPassword) {
      // Password mismatch error
      setErrorMessage("Passwords do not match");
    } else if (!isValid) {
      setErrorMessage("Use valid phone number");
    } else {
      setIsLoading(true);
      const token = localStorage.getItem("otpToken");
      postApi(
        "/auth/sign-up-with-phone",
        {
          name: name,
          password: password,
          token: token,
        },
        null
      )
        .then((response) => {
          localStorage.removeItem("otpToken");
          localStorage.setItem("token", response.data.token);
          setUserState(response.data.user.createdAt);
          setIsLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          setIsLoading(false);
        });
    }
  };

  // Function to verify OTP
  const verifyOtp = () => {
    setErrorMessage(null);
    setIsLoading(true);
    const token = localStorage.getItem("otpToken");
    postApi("/auth/verify-otp", { token: token, otp: otp }, null)
      .then((response) => {
        localStorage.removeItem("otpToken");
        localStorage.setItem("otpToken", response.data.token);
        setIsLoading(false);
        handlePhoneSignUp();
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      });
  };

  // Countdown completion handler
  const handleCountdownComplete = () => {
    setIsCountdownCompleted(true);
  };
  const handleOtpResent = () => {
    sendOtp();
  };

  useEffect(() => {
    setIsSendButtonEnabled(!!phoneNumber.trim());
  }, [phoneNumber]);

  useEffect(() => {
    if (!isCountdownCompleted) {
      // Start the countdown timer for 1 minute (60000 milliseconds)
      const timer = setTimeout(handleCountdownComplete, 60000);
      return () => clearTimeout(timer);
    }
  }, [isCountdownCompleted]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Helmet>
        <title>Sign Up with phone | Banglamart E-commerce</title>
      </Helmet>
      <div className="w-full max-w-md p-6 bg-BackgroundColor rounded-md shadow-lg m-4 ld:m-0">
        <h2 className="text-2xl font-semibold text-center mb-6">
        {language? 'SignUp With Phone':'ফোন সাইন আপ'}
        </h2>
        <div className="mb-4">
          <input
            required
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md mb-2 p-2 w-full outline-none shadow focus:shadow-SubTextColor"
          />

          <input
            required
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="rounded-md p-2 w-full outline-none shadow focus:shadow-SubTextColor"
          />
          {!isValid && <p className="text-[#fd4e4e]">{language? '*Invalid phone number':'ফোন নাম্বার ভুল'}</p>}

          <input
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 rounded-md mb-2 p-2 w-full outline-none shadow focus:shadow-SubTextColor"
          />
          <input
            type="password"
            id="confirmPassword"
            className="rounded-md p-2 w-full outline-none shadow focus:shadow-SubTextColor"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {isOtpSent ? (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ) : null}
        {errorMessage && (
          <div
            className="bg-[#fdd5d5] border-l-4 border-[#ff8383] text-[#ff2b2b] p-4 mb-4"
            role="alert"
          >
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="mb-4 mt-4">
          {isOtpSent ? (
            <button
              onClick={verifyOtp}
              className="bg-MainColor text-CardColor rounded-md p-2 w-28"
            >
              {isLoading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Verify OTP"
              )}
            </button>
          ) : (
            <button
              disabled={!isSendButtonEnabled}
              onClick={sendOtp}
              className="bg-MainColor text-CardColor rounded-md p-2 w-28"
            >
              {isLoading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          )}
        </div>
        {!isCountdownCompleted ? (
          <div className="text-red-500">
           {language? 'Resend OTP in':'ওটিপি আবার পাঠাইতে পারবেন'}{" "}
            <Countdown
              date={Date.now() + 60000}
              onComplete={handleCountdownComplete}
            />
          </div>
        ) : (
          <div>
            <button
              disabled={!isReSendButtonEnabled}
              onClick={() => {
                setIsOtpSent(false);
                setIsCountdownCompleted(false);
                handleOtpResent();
              }}
              className="bg-MainColor text-CardColor rounded-md p-2 w-28"
            >
               {language? 'Resend OTP':'ওটিপি পাঠান'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpWithPhone;
