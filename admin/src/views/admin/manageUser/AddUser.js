import React, { useState } from "react";
import Header from "components/headers";
import { postApi } from "api/api";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { setLoading } from "reducers/isLoading";
import { setChange } from "reducers/change";

export default function AddUser({ onClose }) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [birthday, setBirthday] = useState();
  const alert = useAlert();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="rounded border border-gray-200 p-8">
        {" "}
        <h1 className="text-3xl font-medium">Add User</h1>{" "}
        <p className="mt-6 text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          dolorem vel cupiditate laudantium dicta.
        </p>{" "}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {" "}
          <div>
            {" "}
            <label
              for="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your name"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label
              for="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email Adress
            </label>{" "}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="yourmail@provider.com"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label
              for="job"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>{" "}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              name="job"
              id="job"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="(ex. 0170000000)"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label
              for="brithday"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>{" "}
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              type="password"
              name="brithday"
              id="brithday"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder=""
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-8 space-x-4">
          {" "}
          <button
            onClick={() => {
              if (!name || !email || !phone || !birthday) {
                return alert.info("All fields are required");
              }
              dispatch(setLoading(true));
              postApi("/auth/signUp", {
                name: name,
                phone: phone,
                email: email,
                password: birthday,
              })
                .then((res) => {
                  dispatch(setLoading(false));
                  alert.success("User created");
                  dispatch(setChange(res?.data))
                  onClose();
                })
                .catch((e) => {
                  alert.error(e.response.data.message);
                  console.error(e.message);
                  dispatch(setLoading(false));
                });
            }}
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>{" "}
          <button
            onClick={onClose}
            className="rounded border border-gray-200 bg-white py-2 px-4 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
