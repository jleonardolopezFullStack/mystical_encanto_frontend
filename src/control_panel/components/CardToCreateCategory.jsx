import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GeneralButton from "./GeneralButton";
import * as axiosService from "../../services/axiosServices";
import "../styles/cardtocreatecategory.css";

const CardToCreateCategory = () => {
  const [stateCategory, setStateCategory] = useState();
  const [getStateCategory, setGetStateCategory] = useState({});
  const [deleteCategory, setDeleteCategory] = useState();
  const [verifyRequest, setVerifyRequest] = useState("");

  const gettingCategoryFromService = async () => {
    const res = await axiosService.getCategorysService();
    //console.log(res.data);
    return setStateCategory(res.data.categorys[1]);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setGetStateCategory({
      ...getStateCategory,
      [e.target.name]: e.target.value,
    });
  };
  const reload = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifyToken = localStorage.getItem("token");
      //console.log(verifyToken);
      const res = await axiosService.postCategorysService(
        getStateCategory,
        verifyToken
      );

      console.log(res.statusText);
      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Category have been created");
      }
      setTimeout(reload, 2000);
    } catch (error) {
      console.log(error.response);
      if (
        error.response.statusText === "Bad Request" ||
        error.response.statusText === "Unauthorized"
      ) {
        setVerifyRequest(error.response.statusText);
      }
    }
  };

  const handleCategoryToDelete = (e) => {
    setDeleteCategory(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const verifyToken = localStorage.getItem("token");
    try {
      const res = await axiosService.deleteCategoryService(name, verifyToken);
      console.log(res);
      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Product have been deleted");
      }
      setTimeout(reload, 1500);
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized" ||
        error?.response?.statusText === "Not Found"
      ) {
        setVerifyRequest(error?.response.statusText);
      }
    }
  };
  console.log(getStateCategory);

  useEffect(() => {
    gettingCategoryFromService();
  }, []);

  return (
    <div className="box_login">
      <div className="container_login">
        <div className="form_login">
          <div className="texts_card_controlpanel">
            <h2>Step 1</h2>
            <h2>Create Category</h2>
          </div>
          <p>
            * General/unique name of the collection.
            <br /> Ex: JordanAir
            <br />* Short name, aprox 2 words.
            <br />* Hexagonal parameters colours Ex:#000fff
          </p>
          <hr />
          <form action="" encType="multipart/form-data">
            <div className="inpuBox_login">
              <input
                type="text"
                placeholder="Category Name, Ex: Kinder"
                onChange={(e) => handleInputChange(e)}
                value={getStateCategory?.name}
                name="name"
              />
            </div>
            <div className="choose_colours">
              <p>Colours:</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_input"
                onChange={(e) => handleInputChange(e)}
                value={getStateCategory?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_input"
                onChange={(e) => handleInputChange(e)}
                value={getStateCategory?.color2}
                name="color2"
              />
            </div>

            <div className="buttons_container">
              <GeneralButton handleSubmit={handleSubmit} />
            </div>
            <hr />
            <div className="select_category_container">
              <select
                className="select_category"
                name="item_selection"
                value={deleteCategory}
                onChange={handleCategoryToDelete}
              >
                <option></option>
                {stateCategory &&
                  stateCategory.map((item) => {
                    return <option key={Math.random()}>{item.name}</option>;
                  })}
              </select>
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_delete_info"
                  name={deleteCategory}
                  onClick={handleDeleteSubmit}
                >
                  Up
                </button>
              </div>
              {/*               <button
                className="buttons_pack button_delete_info"
                name={deleteCategory}
                onClick={handleDeleteSubmit}
              >
                X
              </button> */}
              <p></p>
            </div>

            <hr />
            {(verifyRequest === "Bad Request" ||
              verifyRequest === "Unauthorized" ||
              verifyRequest === "Not Found") && (
              <div className="badRequest_login">
                <p>
                  <span>{verifyRequest}</span>, Credential Wrong, Check and try
                  again
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardToCreateCategory;
