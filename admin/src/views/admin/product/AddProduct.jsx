import React, { useState } from "react";
import CKEditor from "react-ckeditor-component";
import {
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Button,
  Select as S,
  Switch,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";
import { setChange } from "reducers/change";
import Header from "components/headers";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Select from "react-select";
import { useEffect } from "react";
import { Loader } from "App";
import { postApi } from "api/api";
import { useNavigate } from "react-router-dom";
const toolbarConfig = {
  height: 200,
  toolbar: "Full",
  allowedContent: true,
  startupFocus: false,
};

export default function AddProduct({ onClose, addProducts }) {
  const VARIANT = useSelector((state) => state.variant);
  const COLORS = useSelector((state) => state.color);
  const SIZE = useSelector((state) => state.size);
  const categoryList = useSelector((state) => state.category);
  const subCategory = useSelector((state) => state.subCategory);
  const option = useSelector((state) => state.option);
  const user = useSelector((state) => state.user);
  const allBrand = useSelector((state) => state.allBrand);
  const allShop = useSelector((state) => state.allShop);
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [optionId, setOptionId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [picture, setPicture] = useState();
  const [select, setSelect] = useState("BDT");
  const alert = useAlert();
  const [store, setStore] = useState("Shop");
  const [storeId, setStoreId] = useState();
  const [submit, setSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [minOrder, setMinOrder] = useState(1);
  const [totalProduct, setTotalProduct] = useState(1);
  const [coin, setCoin] = useState(0);
  const [offerPice, setOfferPice] = useState(0);
  const [offerType, setOfferType] = useState("Fixed");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [fixedPrice, setFixedPrice] = useState(true);
  const [colorsValue, setColorsValue] = useState();
  const [sizesValue, setSizesValue] = useState();
  const [specificationValue, setSpecificationValue] = useState();

  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  const [specification, setSpecification] = useState();
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [vat, setVat] = useState(0);
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const navigation=useNavigate()

  useEffect(() => {
    setColors([]);
    COLORS?.map((d) => {
      setColors((v) => [
        ...v,
        {
          label: d.title,
          value: d.color,
        },
      ]);
    });
  }, [COLORS]);
  useEffect(() => {
    setSizes([]);
    SIZE?.map((d) => {
      setSizes((v) => [
        ...v,
        {
          label: d.title,
          value: d.cm,
        },
      ]);
    });
  }, [SIZE]);
  useEffect(() => {
    setSpecification([]);
    VARIANT?.map((d) => {
      setSpecification((v) => [
        ...v,
        {
          label: `${d.title}`,
          value: d.details,
        },
      ]);
    });
  }, [VARIANT]);

  const addNewProduct = async () => {
    if (
      !categoryId ||
      !subCategoryId ||
      !optionId ||
      !title ||
      !description ||
      !price ||
      !picture ||
      !storeId ||
      !select ||
      !totalProduct ||
      !minOrder ||
      (!freeDelivery && !deliveryFee)
    ) {
      alert.info("Some fields are required");
      return setSubmit(true);
    }

    dispatch(setLoading(true));
    try {
      const form = new FormData();
      form.append("price", price);
      form.append("coin", select === "Coin" ? "1" : "");
      form.append("title", title);
      form.append("description", description);
      form.append("quantity", totalProduct);
      form.append("minOrder", minOrder);
      form.append("freeCoin", coin);
      offerPice&&form.append("offer", offerPice);
      form.append("percentage", offerType === "Percentage" ? "1" : "");
      form.append("freeDelivery", freeDelivery ? "1" : "");
      form.append("fixedPrice", fixedPrice ? "1" : "");
      form.append("vat", vat);
      colorsValue && form.append("colors", JSON.stringify(colorsValue));
      sizesValue && form.append("sizes", JSON.stringify(sizesValue));
      specificationValue &&
        form.append("specifications", JSON.stringify(specificationValue));
      form.append("storeId", storeId);
      form.append("categoryId", categoryId);
      form.append("subCategoryId", subCategoryId);
      form.append("optionId", optionId);
      form.append("storeType", store);
      form.append("thumbnail", picture);
      deliveryFee&&form.append("deliveryCharge", deliveryFee);
      if (images && images.length > 0) {
        const f = new FormData();
        images.map((d) => {
          f.append("images", d);
        });
        const res = await postApi("/uploadImages", f);
        form.append("images", JSON.stringify(res.data.images));
      }
      addProduct(form, user.token)
        .then((res) => {
          dispatch(setChange(res));
          dispatch(setLoading(false));
          Swal.fire("Success", "Product added successful", "success");
          navigation(-1)
        })
        .catch((err) => {
          dispatch(setLoading(false));
          Swal.fire("Ops!", err.response.data.message, "error");
        });
    } catch (e) {
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  if (!VARIANT || !COLORS || !SIZE) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="dark:text-white">
      <div className="headLine">Add Products</div>
      {/* categories */}
      <h2 className="mediumText mb-2">Product Categories*</h2>
      <div className=" lg:grid lg:grid-cols-3 lg:gap-4 dark:text-[#000]">
        <div>
          <S
            isInvalid={submit && !categoryId}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={style}
            className="my-2"
            placeholder="Select Category"
          >
            {categoryList?.map((doc, i) => (
              <option key={i} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </S>
          {submit && !categoryId && (
            <div className="text-red-500">Select category!</div>
          )}
        </div>
        <div>
          <S
            isInvalid={submit && !subCategoryId}
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
            style={style}
            className="my-2"
            placeholder="Select Sub-Category"
          >
            {subCategory
              ?.filter((d) => d.categoryId === categoryId)
              .map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
          </S>
          {submit && !subCategoryId && (
            <div className="text-red-500">Select Sub-Category!</div>
          )}
        </div>
        <div>
          <S
            isInvalid={submit && !optionId}
            value={optionId}
            onChange={(e) => setOptionId(e.target.value)}
            style={style}
            className="my-2"
            placeholder="Select Option"
          >
            {option
              ?.filter((d) => d.subCategoryId === subCategoryId)
              ?.map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
          </S>
          {submit && !optionId && (
            <div className="text-red-500">Select option!</div>
          )}
        </div>
      </div>
      {/* Your shop/brand */}
      <h2 className="mediumText mt-4 mb-2">Select Shop/Brand*</h2>
      <div className=" lg:grid lg:grid-cols-9 lg:gap-4 dark:text-[#000]">
        <div className=" col-span-4">
          <S
            isInvalid={submit && !store}
            value={store}
            onChange={(e) => setStore(e.target.value)}
            style={style}
            className="my-2"
            placeholder="Select Store"
          >
            <option value="Shop">Shop</option>
            <option value="Brand">Brand</option>
          </S>
          {submit && !store && (
            <div className="text-red-500">Select Store type!</div>
          )}
        </div>
        <div className="headLine dark:text-white flex h-full items-center justify-center">
          And
        </div>
        <div className=" col-span-4">
          <S
            isInvalid={submit && !storeId}
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            style={style}
            className="my-2"
            placeholder={`Select ${store === "Shop" ? "Shop" : "Brand"}`}
          >
            {store === "Shop"
              ? allShop
                  ?.filter((d) => d.verified && d.userId.match(user.user.id))
                  .map((doc, i) => (
                    <option key={i} value={doc.id}>
                      {doc.shopName}
                    </option>
                  ))
              : allBrand
                  ?.filter((d) => d.verified && d.userId.match(user.user.id))
                  .map((doc, i) => (
                    <option key={i} value={doc.id}>
                      {doc.brandName}
                    </option>
                  ))}
          </S>
          {submit && !storeId && (
            <div className="text-red-500">Select Store!</div>
          )}
        </div>
      </div>
      {/* Title and vat */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-4">
        <div className=" col-span-3">
          <h2 className="mediumText mt-4 mb-2">Product Title*</h2>
          <Input
            isInvalid={submit && !title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={style}
            placeholder="Product Title"
          />
          {submit && !title && (
            <div className="text-red-500">Product title is required!</div>
          )}
        </div>
        <div>
          <h2 className="mediumText mt-4 mb-2">Product VAT* %</h2>
          <Input
            isInvalid={submit && !vat}
            value={vat}
            onChange={(e) => setVat(e.target.value)}
            style={style}
            type={"number"}
            onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            placeholder="Product VAT"
          />
          {submit && !vat && (
            <div className="text-red-500">Product title is required!</div>
          )}
        </div>
      </div>
      {/* Price ,Thumbnail */}
      <div className="mt-6 grid items-center gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mediumText mb-4 mt-3">Product Price & Currency*</h2>
          <InputGroup className="dark:text-[#000]">
            <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
              isInvalid={submit && !price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={style}
              type={"number"}
              placeholder="Product Price"
            />
            <InputRightElement
              style={{
                width: 120,
              }}
            >
              <S
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                placeholder="Currency"
              >
                <option value="Coin">Coin</option>
                <option value="BDT">BDT</option>
              </S>
            </InputRightElement>
          </InputGroup>
          {submit && !price && (
            <div className="text-red-500">Product price is required!</div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h2 className="mediumText mb-4 mt-3">
              Product Thumbnail (Ratio 580*720)*
            </h2>
            {picture && (
              <img
                className="m-2 h-10 w-10"
                src={URL.createObjectURL(picture)}
                alt={"ty"}
              />
            )}
          </div>
          <Input
            isInvalid={submit && !picture}
            onChange={(e) =>
              setPicture(e.target.files[e.target.files.length - 1])
            }
            style={style}
            type="file"
            accept="image/jpeg,image/png"
            placeholder="Product thumbnail"
          />
          {submit && !picture && (
            <div className="text-red-500">Product thumbnail is required!</div>
          )}
        </div>
      </div>
      {/* min order, total product, free coin */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div>
          <h2 className="mediumText mb-2">Min Order*</h2>
          <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            //isInvalid={submit && !price}
            value={minOrder}
            onChange={(e) => setMinOrder(e.target.value)}
            style={style}
            type="number"
            placeholder="eg. 10"
          />
          {submit && !minOrder && (
            <div className="text-red-500">Min Order required!</div>
          )}
        </div>
        <div>
          <h2 className="mediumText mb-2">Total Product*</h2>
          <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            //isInvalid={submit && !picture}
            onChange={(e) => {
              setTotalProduct(e.target.value);
            }}
            value={totalProduct}
            style={style}
            type="number"
            placeholder="eg. 100"
          />
          {submit && !totalProduct && (
            <div className="text-red-500">Total product is required!</div>
          )}
        </div>
        <div>
          <h2 className="mediumText mb-2">Free Coin</h2>
          <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            //isInvalid={submit && !price}
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            style={style}
            type="number"
            placeholder="eg. 10"
          />
        </div>
      </div>
      {/* offer , fixed price, free delivery */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className=" col-span-2">
          <h2 className="mediumText mb-2">Product Offer & Type</h2>
          <InputGroup className="dark:text-[#000]">
            <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
              //isInvalid={submit && !price}
              value={offerPice}
              onChange={(e) => setOfferPice(e.target.value)}
              style={style}
              type="number"
              placeholder="eg. 10"
            />
            <InputRightElement
              style={{
                width: 150,
              }}
            >
              <S
                value={offerType}
                onChange={(e) => {setOfferType(e.target.value)
                console.log(e.target.value);}}
                placeholder="Fixed"
              >
                
                <option value="Percentage">Percentage</option>
              </S>
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="col-span-2 mt-4 flex items-center">
          <div className=" mt-4 flex h-full items-center">
            <h2 className="mediumText mr-6">Free Delivery</h2>
            <Switch
              isChecked={freeDelivery}
              defaultChecked={freeDelivery}
              onChange={() => setFreeDelivery((v) => !v)}
              size="lg"
            />
            {!freeDelivery && (
              <div className="mx-2">
                <Input onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(e.target.value)}
                  placeholder="Delivery Fee"
                  style={style}
                />
                {submit && !deliveryFee && (
                  <div className="mt-1 text-red-500">
                    Delivery fee required!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className=" mt-4 flex h-full items-center ">
          <h2 className="mediumText mr-6">Fixed Price</h2>
          <Switch
            isChecked={fixedPrice}
            onChange={() => setFixedPrice((v) => !v)}
            size="lg"
          />
        </div>
      </div>
      {/* multiple images */}
      <h2 className="mediumText mb-2 mt-6">More Images(max 10)</h2>
      <div className=" grid grid-cols-2">
        <Input  id="input"
          style={style}
          className="mt-2 hidden"
          accept="image/jpeg,image/png"
          onChange={(e) => {
            setImages(Array.from(e.target.files));
          }}
          //value={images}
          multiple
          type={"file"}
        />
        <Button
          colorScheme={"blue"}
          onClick={() => {
            document.getElementById("input").click();
          }}
        >
          Upload
        </Button>
        <div className="ml-4 flex flex-wrap items-center">
          {images?.map((doc, i) => (
            <div key={i}>
              <AiOutlineCloseCircle
                onClick={() => {
                  setImages((v) => {
                    return v.filter((d, j) => i !== j);
                  });
                }}
                className="absolute rounded-full bg-white"
                size={20}
                color="blue"
              />
              <img
                className="m-2 h-14 w-14"
                alt={doc.name}
                src={URL.createObjectURL(doc)}
              />
            </div>
          ))}
          {images?.length === 0 && (
            <div className="m-2 h-14 ">
              <p>No Picture added</p>
            </div>
          )}
        </div>
      </div>
      {/* colors */}
      <div>
        <h2 className="mediumText mt-4 mb-2">Add Colors</h2>
        <div className="text-[#000]">
          <Select
            value={colorsValue}
            isMulti
            onChange={setColorsValue}
            name="colors"
            options={colors}
            className="basic-multi-select"
            classNamePrefix="select"
            components={{ Option:(props,i)=> <CustomOption {...props} index={i} /> }}
            
          />
        </div>
      </div>

      {/* sizes */}
      <div>
        <h2 className="mediumText mt-4 mb-2">Add Sizes</h2>
        <div className="text-[#000]">
          <Select
            //defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            value={sizesValue}
            name="colors"
            options={sizes}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              setSizesValue(e);
            }}
          />
        </div>
      </div>
      {/* Specifications */}
      <div>
        <h2 className="mediumText mt-4 mb-2">Add Specifications</h2>
        <div className="text-[#000]">
          <Select
            //defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            value={specificationValue}
            name="colors"
            onChange={setSpecificationValue}
            options={specification}
            className="basic-multi-select"
            classNamePrefix="select"
            components={{ Option:(props,i)=> <CustomOptionSpecification {...props} index={i} /> }}
          />
        </div>
      </div>
      {/* details */}
      <div>
        <h2 className="mediumText my-2 mt-6">Product Description</h2>
        <CKEditor
          activeClass=""
          config={toolbarConfig}
          content={description}
          events={{
            change: (event) => {
              const data = event.editor.getData();
              setDescription(data);
            },
          }}
        />

        {submit && !description && (
          <div className="text-red-500">Product description is required!</div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={addNewProduct} colorScheme="blue">
          Save
        </Button>
        <Button onClick={()=>navigation(-1)} className="ml-4" colorScheme="red">
          Close
        </Button>
      </div>
    </div>
  );
}
const style = {
  backgroundColor: "#fff",
  color: "#000",
};
const CustomOption = ({ innerRef, innerProps ,value,label}) => {
  return <div className="flex p-2 items-center" ref={innerRef} {...innerProps} ><div style={{
    backgroundColor:value
  }} className={`w-4 h-4 rounded-full mr-2 border border-blueSecondary`}/>{label}</div>
}

const CustomOptionSpecification = ({ innerRef, innerProps ,value,label}) => {
  return <div className="flex p-2 items-center" ref={innerRef} {...innerProps} >{label}:{value} </div>
}