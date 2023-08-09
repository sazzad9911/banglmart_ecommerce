import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Button,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
import { setLoading } from "reducers/isLoading";
import { addProduct } from "api/productApi";

export default function AddProduct({ onClose }) {
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [optionId, setOptionId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [picture, setPicture] = useState();
  const categoryList = useSelector((state) => state.category);
  const subCategory = useSelector((state) => state.subCategory);
  const option = useSelector((state) => state.option);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [submit, setSubmit] = useState(false);

  const addNewProduct = async () => {
    if (
      !categoryId ||
      !subCategoryId ||
      !optionId ||
      !title ||
      !description ||
      !price ||
      !picture
    ) {
      return setSubmit(true);
    }
    onClose();
    dispatch(setLoading(true));
    try {
      const form = new FormData();
      form.append("categoryId", categoryId);
      form.append("subCategoryId", subCategoryId);
      form.append("optionId", optionId);
      form.append("price", price);
      form.append("title", title);
      form.append("description", description);
      form.append("verified", "new");
      form.append("thumbnail", picture);
      await addProduct(form, user.token)
      onClose();
      dispatch(setLoading(false));
      Swal.fire("Success", "Product added successful", "success");
    } catch (e) {
      onClose();
      dispatch(setLoading(false));
      Swal.fire("Ops!", "Something went wrong", "error");
    }
  };
  return (
    <div>
      <h2 className="mediumText mb-2">Product Categories</h2>
      <div className=" lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <Select
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
          </Select>
          {submit && !categoryId && (
            <div className="text-red-500">Select category!</div>
          )}
        </div>
        <div>
          <Select
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
          </Select>
          {submit && !subCategoryId && (
            <div className="text-red-500">Select Sub-Category!</div>
          )}
        </div>
        <div>
          <Select
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
          </Select>
          {submit && !optionId && (
            <div className="text-red-500">Select option!</div>
          )}
        </div>
      </div>
      <h2 className="mediumText mt-4 mb-2">Product Title</h2>
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
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h2 className="mediumText mb-2">Product Price</h2>
          <Input
            isInvalid={submit && !price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={style}
            type="number"
            placeholder="Product Price"
          />
          {submit && !price && (
            <div className="text-red-500">Product price is required!</div>
          )}
        </div>
        <div>
          <h2 className="mediumText mb-2">Product Thumbnail</h2>
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
      <div>
        <h2 className="mediumText my-2 mt-6">Product Description</h2>
        <CKEditor
          editor={ClassicEditor}
          data={description}
          onReady={(editor) => {
            editor.ui.view.editable.element.style.height = "120px";
            // You can store the "editor" and use when it is needed.
            //console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
          onBlur={(event, editor) => {
            //console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("Focus.", editor);
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
        <Button onClick={onClose} className="ml-4" colorScheme="red">
          Close
        </Button>
      </div>
    </div>
  );
}
const style = {
  borderColor: "#ABB2B9",
};
