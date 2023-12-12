import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgetPassword() {
  const route = useNavigate();
  const [secure,setSecure]=useState(false)
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Phone Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Use phone number & password!
        </p>

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Phone*"
          placeholder="01*********"
          id="email"
          type="text"
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="*******"
          id="password"
          type={secure?"text":"password"}
          
        />

        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox value={secure} onChange={()=>setSecure(v=>!v)} />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Show Password
            </p>
          </div>
          <Link
            to={"/panel/auth/sign-in"}
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Back
          </Link>
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
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
