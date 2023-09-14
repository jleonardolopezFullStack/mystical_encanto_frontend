import React, { useEffect, useState } from "react";
import FormData from "form-data";
import SelectCategory from "./SelectCategory";
import { toast } from "react-toastify";
import * as axiosService from "../../services/axiosServices";
import GeneralButton from "./GeneralButton";

const CardToCreateProduct = () => {
  const [stateCreationProduct, setStateCreationProduct] = useState({});
  const [stateProduct, setStateProduct] = useState();
  const [files, setFiles] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState();
  const [verifyRequestCardProduct, setVerifyRequestCardProduct] = useState("");

  const gettingProductFromService = async () => {
    const res = await axiosService.getProductsService();
    //console.log(res.data.product[1]);
    return setStateProduct(res.data.product[1]);
  };

  const handleGetProductState = (e) => {
    setStateCreationProduct({
      ...stateCreationProduct,
      [e.target.name]: e.target.value,
    });
  };

  const reload = () => {
    window.location.reload();
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const verifyToken = localStorage.getItem("token");
    try {
      let formdata = new FormData();
      formdata.append("image", files);
      stateCreationProduct.name &&
        formdata.append("name", stateCreationProduct.name);
      stateCreationProduct.category &&
        formdata.append("category", stateCreationProduct.category);
      stateCreationProduct.variant &&
        formdata.append("variant", stateCreationProduct.variant);
      formdata.append("quantityImg", 1);
      stateCreationProduct.quantity &&
        formdata.append("quantity", stateCreationProduct.quantity);
      stateCreationProduct.price &&
        formdata.append("price", stateCreationProduct.price);
      stateCreationProduct.discount &&
        formdata.append("discount", stateCreationProduct.discount);
      stateCreationProduct.color &&
        formdata.append("color", stateCreationProduct.color);
      stateCreationProduct.idStripe &&
        formdata.append("idStripe", stateCreationProduct.idStripe);
      const res = await axiosService.postProductsService(formdata, verifyToken);
      //console.log(res);
      if (res.statusText === "OK") {
        setVerifyRequestCardProduct("");
        toast.success("Product have been created");
      }
      setTimeout(reload, 2000);
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequestCardProduct(error?.response?.statusText);
      }
    }
  };

  const handleProductToDelete = (e) => {
    setDeleteProduct(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const verifyToken = localStorage.getItem("token");
    try {
      const res = await axiosService.deleteProductService(name, verifyToken);
      console.log(res);
      if (res.statusText === "OK") {
        setVerifyRequestCardProduct("");
        toast.success("Product have been deleted");
      }
      setTimeout(reload, 1500);
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequestCardProduct(error?.response.statusText);
      }
    }
  };
  // console.log(stateCreationProduct);
  //console.log(files);
  //console.log(stateProduct);
  //console.log(deleteProduct);

  useEffect(() => {
    gettingProductFromService();
  }, []);

  return (
    <>
      <div className="box_login">
        <div className="container_login">
          <div className="form_login">
            <div className="texts_card_controlpanel">
              <h2>Step 2</h2>
              <h2>Create Product</h2>
            </div>
            <p>
              * Each product depending of single variant.
              <br /> Ex: product1: Jordan
              <br />* Short name, aprox 1 words.
              <br />* Hexagonal parameters colours Ex:#000fff
              <br />* Image 500x500px whithout background
            </p>
            <hr />
            <form action="">
              <SelectCategory
                getStateCategory={stateCreationProduct}
                handleGetProductState={handleGetProductState}
              />
              <h4>
                {stateCreationProduct ? stateCreationProduct.category : "..."}
              </h4>

              <div className="inpuBox_login">
                <input
                  type="text"
                  placeholder="Product Name"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.name}
                  name="name"
                />
              </div>

              <div className="inpuBox_login">
                <input
                  type="text"
                  placeholder="Color (Hexagonal Color: #000)"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.color}
                  name="color"
                />
              </div>

              <div className="inpuBox_login">
                <input
                  type="text"
                  placeholder="Variant or size"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.variant}
                  name="variant"
                />
              </div>

              <div className="inpuBox_login">
                <input
                  type="number"
                  placeholder="Quantity in Stock"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.quantity}
                  name="quantity"
                />
              </div>

              <div className="inpuBox_login">
                <input
                  type="number"
                  placeholder="$ Product Price AUD"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.price}
                  name="price"
                />
              </div>

              <div className="inpuBox_login">
                <input
                  type="number"
                  placeholder="$ Product Discount AUD"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.discount}
                  name="discount"
                />
              </div>
              <div className="inpuBox_login">
                <input
                  type="text"
                  placeholder="$ ID from Stripe"
                  onChange={handleGetProductState}
                  value={stateCreationProduct?.idStripe}
                  name="idStripe"
                />
              </div>
              <div className="inpuBox_login">
                <input
                  type="file"
                  onChange={(e) => {
                    setFiles(e.target.files[0]);
                  }}
                  name="file"
                />
              </div>
              <div className="buttons_container">
                <GeneralButton handleSubmit={handleSubmitProduct} />
              </div>
              <br />
              <hr />
              <div className="select_category_container">
                <select
                  className="select_category"
                  name="item_selection"
                  value={deleteProduct}
                  onChange={handleProductToDelete}
                >
                  <option></option>
                  {stateProduct &&
                    stateProduct.map((item) => {
                      return <option key={Math.random()}>{item.name}</option>;
                    })}
                </select>
                <div className="buttons_info_container ">
                  <button
                    className="buttons_pack button_delete_info"
                    name={deleteProduct}
                    onClick={handleDeleteSubmit}
                  >
                    X
                  </button>
                </div>
                {/*             <button
                  name={deleteProduct}
                  className="buttons_pack button_delete_info"
                  onClick={handleDeleteSubmit}
                >
                  X
                </button> */}
                <p></p>
              </div>

              <hr />
              {(verifyRequestCardProduct === "Bad Request" ||
                verifyRequestCardProduct === "Unauthorized") && (
                <div className="badRequest_login">
                  <p>
                    <span>{verifyRequestCardProduct}</span>, Credential Wrong,
                    Check and try again
                  </p>
                </div>
              )}
            </form>
            {/*  <ToastContainer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardToCreateProduct;
