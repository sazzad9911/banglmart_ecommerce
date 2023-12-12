import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useLoader from "hooks/useLoader";
import { useAlert } from "react-alert";
import { checkSellerRequest, signIn } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "reducers/user";
import { setLoading } from "reducers/isLoading";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  // signOut,
} from "firebase/auth";
import {auth} from "../../firebase"
import { postApi } from "api/api";

export default function SignIn() {
  const route = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const provider = new GoogleAuthProvider();
 

  const login = () => {
    if (!email | !password) {
      return alert.info("Fill all the required fields");
    }

    dispatch(setLoading(true));
    signIn(email, password)
      .then(async (res) => {
        if (res.data?.user?.role === 1) {
          return alert.info("Need seller account to login");
        }
        dispatch(setUser(res.data));
        //console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        route("/panel");
        dispatch(setLoading(false));
        
      })
      .catch((e) => {
        dispatch(setLoading(false));
        //console.log(e);
        alert.error(e.response.data.message);
      });
  };
  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));

    try {
      const res = await signInWithPopup(auth, provider);
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
          if (res.data?.user?.role === 1) {
            return alert.info("Need seller account to login");
          }
          dispatch(setUser(res.data));
          //console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          route("/panel");
          dispatch(setLoading(false));
        })
        .catch((e) => {
          dispatch(setLoading(false));
          alert.error(e.response.data.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div onClick={handleGoogleLogin} className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        {/* <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}
        <InputField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type={show ? "text" : "password"}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox value={show} onChange={() => setShow((v) => !v)} />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Show password
            </p>
          </div>
          <Link  to={"/panel/auth/phone-password"}
            onClick={() => {
             // route("/auth/forget-password");
            }}
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          
          >
            Use phone?
          </Link>
        </div>
        <button
          onClick={login}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Sign In
        </button>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </div>
    </div>
  );
}
