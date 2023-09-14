import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { toast } from "react-toastify";
import * as axiosService from "../../services/axiosServices";
import GeneralButton from "./GeneralButton";
import SelectProduct from "./SelectProduct";
import "../styles/cardtocreatemainpage.css";

const CardToCreateMainPage = () => {
  const [stateProduct, setStateProduct] = useState();
  const [selectingProduct, setSelectingProduct] = useState();
  const [stateMainPage, setStateMainPage] = useState([]);
  const [verifyRequestMainPage, setVerifyRequestMainPage] = useState("");
  const [getMainPage, setGetMainPage] = useState();

  const gettingProductFromService = async () => {
    const res = await axiosService.getProductsService();
    //console.log(res.data.product[1]);
    return setStateProduct(res.data.product[1]);
  };

  const gettingMainPageFromService = async () => {
    const res = await axiosService.getMainpageService();
    //console.log(res.data.mainpage[1]);
    const mirar2 = res.data.mainpage[1]?.filter((product) => {
      return product.urlCloudinary !== "undefined";
    });
    return setGetMainPage(mirar2);
  };

  const handleGetProductState = async (e) => {
    setSelectingProduct({
      ...selectingProduct,
      [e.target.name]: e.target.value,
    });
    const mirar = stateProduct.filter((product) => {
      return product.name === selectingProduct?.product;
    });
    setStateMainPage([
      {
        urlCloudinary: mirar[0]?.urlCloudinary[0],
        idCloudinary: mirar[0]?.idCloudinary[0],
        color: mirar[0]?.color,
      },
    ]);
    handleSubmitMainPage();
  };

  const handleSubmitMainPage = async () => {
    /*   e.preventDefault(); */
    const verifyToken = localStorage.getItem("token");
    try {
      let formdata = new FormData();
      formdata.append("color", stateMainPage[0]?.color);
      formdata.append("idCloudinary", stateMainPage[0]?.idCloudinary);
      formdata.append("urlCloudinary", stateMainPage[0]?.urlCloudinary);
      const res = await axiosService.postMainPageService(formdata, verifyToken);
      //console.log(res);
      if (res.statusText === "OK") {
        gettingMainPageFromService();
        setVerifyRequestMainPage("");
        toast.success("Product have been created");
      }
      /*       setTimeout(reload, 2000); */
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequestMainPage(error?.response?.statusText);
      }
    }
  };

  /* console.log(stateCreationProduct);
  console.log(files); */
  // console.log(selectingProduct);
  // console.log(stateMainPage);
  //console.log(stateProduct);
  //console.log(getMainPage);

  const deleteImgMainPage = async (e) => {
    const idCloudinary = e.target.name;
    const verifyToken = localStorage.getItem("token");
    try {
      const res = await axiosService.deleteMainPageService(
        idCloudinary,
        verifyToken
      );
      //console.log(res);
      if (res.statusText === "OK") {
        gettingMainPageFromService();
        setVerifyRequestMainPage("");
        toast.success("Product have been delete created");
      }
      /*       setTimeout(reload, 2000); */
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequestMainPage(error?.response.statusText);
      }
    }
  };

  useEffect(() => {
    gettingProductFromService();
    gettingMainPageFromService();
  }, [stateMainPage]);
  return (
    <>
      <div className="box_login">
        <div className="container_login">
          <div className="form_login">
            <div className="texts_card_controlpanel">
              <h2>Step 3</h2>
              <h2>Create Main Page</h2>
            </div>
            <p>
              * Image 500x500px whithout background.
              <br />* No more than 4 Products.
            </p>

            <hr />
            <form action="">
              <div className="select_category_container">
                <p>Select products:</p>
                <select
                  className="select_category"
                  name="product"
                  value={selectingProduct}
                  onChange={handleGetProductState}
                  key={Math.random()}
                >
                  <option></option>
                  {stateProduct?.map((product) => {
                    return <option key={Math.random()}>{product?.name}</option>;
                  })}
                </select>
              </div>
              <p>{selectingProduct?.product}</p>
              <p>{stateMainPage?.color}</p>
            </form>
            <div className="container_mainpage_image">
              <ul className="ul_products">
                {getMainPage ? (
                  getMainPage.map((i) => {
                    return (
                      <li
                        value={i.urlCloudinary}
                        key={Math.random()}
                        className="list_products"
                      >
                        <a>
                          <img
                            src={i.urlCloudinary}
                            name={i.urlCloudinary}
                            /* onClick={handleArrayProductsChange} */
                          ></img>
                          <button
                            name={i.idCloudinary}
                            className="delete_img_main_page"
                            onClick={deleteImgMainPage}
                          >
                            X
                          </button>
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <li value="NoProduct">No Exist Product</li>
                )}
              </ul>
            </div>
            <hr />
            {(verifyRequestMainPage === "Bad Request" ||
              verifyRequestMainPage === "Unauthorized") && (
              <div className="badRequest_login">
                <p>
                  <span>{verifyRequestMainPage}</span>, Credential Wrong, Check
                  and try again
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardToCreateMainPage;
