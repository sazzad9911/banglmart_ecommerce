import { putApi } from "api/api";
import { postApi } from "api/api";
import { url } from "api/authApi";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setChange } from "reducers/change";
import { setLoading } from "reducers/isLoading";

export default function AddShop({ onClose, data }) {
  const categoryList = useSelector((state) => state.category);
  const allShop = useSelector((state) => state.allShop);
  const user = useSelector((state) => state.user);
  const [list, setList] = useState([]);
  const [myShop, setMyShop] = useState(data);
  const [address, setAddress] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [logo, setLogo] = useState();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    setList([]);
    categoryList?.map((doc) => {
      setList((v) => [
        ...v,
        {
          label: doc.name,
          value: doc.id,
        },
      ]);
    });
  }, [categoryList]);
  
  useEffect(() => {
    if (myShop) {
      setName(myShop.shopName);
      setAddress(myShop.shopAddress);
      setCategory(myShop.categories);
    }
  }, [myShop]);

  const addShop = async () => {
    onClose()
    if(!name||!category||!address||!logo){
      return alert.info("Please fill all the fields")
    }
    
    dispatch(setLoading(true));
    const data = new FormData();
    data.append("shopName", name);
    data.append("shopAddress", address);
    data.append("logo", logo);
    data.append("categories", JSON.stringify(category));
    data.append("verified", "1");
    postApi("/store/addSeller", data, user.token)
      .then((res) => {
        //onClose()
        dispatch(setLoading(false));
        dispatch(setChange(res.data));
        //console.log(res.data);
        alert.success("You shop has added successfully");
      })
      .catch((error) => {
       
        dispatch(setLoading(false));
        alert.error(error.response.data.message);
      });
  };
  const updateShop = async () => {
    onClose()
    if(!name||!category||!address){
      return alert.info("Please fill all the fields")
    }
   
    dispatch(setLoading(true));
    const data = new FormData();
    data.append("shopName", name);
    data.append("shopAddress", address);
    data.append("sellerId", myShop.id);
    logo && data.append("logo", logo);
    data.append("categories", JSON.stringify(category));
    data.append("verified", myShop.verified ? "1" : "");
    putApi("/store/updateSeller", data, user.token)
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setChange(res.data));
        console.log(res.data);
        alert.success("You shop has updated successfully");
      })
      .catch((error) => {
        dispatch(setLoading(false));
        alert.error(error.response.data.message);
      });
  };
  return (
    <div>
      <div className="rounded border border-gray-200 p-8">
        {" "}
        <h1 className="text-3xl font-medium">
          {myShop ? "Update" : "Add"} Shop
        </h1>{" "}
        <p className="mt-6 text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          dolorem vel cupiditate laudantium dicta.
        </p>{" "}
        {myShop && !myShop.verified && (
          <p
            className="mt-2 text-red-600
          "
          >
            *Your shop is not verified or it has banned some how. Please contact
            to the customer care.
          </p>
        )}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {" "}
          <div>
            {" "}
            <label
              for="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Shop Name
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
              Outlet Address
            </label>{" "}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="email"
              id="email"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="eg. Dhanmondi, Dhaka"
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label
              for="job"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Logo
            </label>{" "}
            <input
             
              onChange={(e) => setLogo(e.target.files[0])}
              type="file"
              name="job"
              id="job"
              className="block w-full rounded border border-gray-200 bg-gray-100 py-1 px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              placeholder="(ex. 0170000000)"
            />{" "}
            {myShop && (
              <div className="flex items-center">
                <img
                  className="my-3 h-10 w-10 rounded-full"
                  crossOrigin={"anonymous"}
                  alt="te"
                  src={`${url}${myShop.logo}`}
                />
                <div className="ml-3">The logo has used</div>
              </div>
            )}
          </div>{" "}
          <div>
            {" "}
            <label
              for="brithday"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category
            </label>{" "}
            <div className="text-gray-700 focus:border-blue-500 focus:ring-blue-500">
              <Select
                onChange={setCategory}
                defaultValue={category}
                //isMulti
                value={category}
                name="colors"
                options={list}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>{" "}
        </div>{" "}
        <div className="mt-8 space-x-4">
          {" "}
          <button onClick={!myShop?addShop:updateShop}
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
          >
            {myShop ? "Update" : "Save"}
          </button>{" "}
          {/* <button
            onClick={onClose}
            className="rounded border border-gray-200 bg-white py-2 px-4 text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >
            Cancel
          </button>{" "} */}
        </div>{" "}
      </div>
    </div>
  );
}
