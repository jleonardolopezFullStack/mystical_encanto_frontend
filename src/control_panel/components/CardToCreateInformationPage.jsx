import { useState, useEffect } from "react";

import FormData from "form-data";
import { toast } from "react-toastify";
import * as axiosService from "../../services/axiosServices";

import "../styles/cardtocreateinformationpage.css";
import GeneralButton from "./GeneralButton";

const CardToCreateInformationPage = () => {
  const [getInformation, setGetInformation] = useState();
  const [stateInformation, setStateInformation] = useState({ items: [] });
  const [files, setFiles] = useState(null);
  const [collectionItems, setCollectionItems] = useState("");
  const [verifyRequestCardProduct, setVerifyRequestCardProduct] = useState("");

  const gettingInformationFromService = async () => {
    const res = await axiosService.getInformationPageService();
    //console.log(res.data.information[1]);
    return setGetInformation(res.data.information[1]);
  };

  const handleGetInfoChangle = (e) => {
    setStateInformation({
      ...stateInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleCollectingItems = (e) => {
    setCollectionItems(e.target.value);
  };

  const addingItemsGlobalInfo = (e) => {
    e.preventDefault();
    const newState = { ...stateInformation };

    newState.items.push(collectionItems);
    //console.log(newState);
    setStateInformation(newState);
    setCollectionItems("");
  };

  const updateInformation = async (e) => {
    e.preventDefault();
    const verifyToken = localStorage.getItem("token");
    /*   const items = getInformation[0]?.items; 
    const newItems = [...items];*/
    try {
      let formdata = new FormData();
      formdata.append("image", files);
      stateInformation?.description &&
        formdata.append("description", stateInformation?.description);
      stateInformation?.items.length > 0 &&
        formdata.append("items", stateInformation?.items);
      const res = await axiosService.putInformationService(
        formdata,
        verifyToken
      );
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

  const reload = () => {
    window.location.reload();
  };

  const handleSubmitInformation = async (e) => {
    e.preventDefault();
    const verifyToken = localStorage.getItem("token");
    try {
      let formdata = new FormData();
      formdata.append("image", files);
      formdata.append("description", stateInformation?.description);
      formdata.append("items", stateInformation?.items);
      const res = await axiosService.postInformationService(
        formdata,
        verifyToken
      );
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
  // console.log(getInformation[0]?.items);
  //console.log(stateInformation);
  //console.log(collectionItems);
  //console.log(files);

  useEffect(() => {
    gettingInformationFromService();
  }, []);

  return (
    <>
      <div className="box_login">
        <div className="container_login">
          <div className="form_login">
            <div className="texts_card_controlpanel">
              <h2>Step 4</h2>
              <h2>Information</h2>
            </div>
            <p>
              *Items: # staffs in your product.
              <br />* Image 500x500px whithout background.
            </p>

            <hr />
            <form>
              <div className="textarea_container">
                <textarea
                  name="description"
                  className="textarea_info"
                  value={stateInformation?.description}
                  placeholder="Enter the description of the product"
                  onChange={handleGetInfoChangle}
                ></textarea>
                <div className="buttons_info_container ">
                  <button
                    className="buttons_pack button_update_info"
                    onClick={updateInformation}
                  >
                    Up
                  </button>
                </div>
              </div>
              <br></br>
              <h4>Package include:</h4>

              <div className="inpuBox_info">
                <input
                  type="text"
                  placeholder="New Item or Update"
                  value={collectionItems}
                  onChange={handleCollectingItems}
                  name="item"
                />
                <button
                  className="buttons_pack button_add_info"
                  onClick={addingItemsGlobalInfo}
                >
                  Add
                </button>
              </div>

              <div className="select_category_container">
                <select
                  key={Math.random()}
                  className="select_category"
                  name="item_selection"
                  value={stateInformation?.item_selection}
                  onChange={handleGetInfoChangle}
                >
                  <option></option>
                  {getInformation &&
                    getInformation[0]?.items.map((item) => {
                      return <option key={Math.random()}>{item}</option>;
                    })}
                </select>
                <button className="buttons_pack button_add_info">Add</button>
                <button
                  className="buttons_pack button_update_info"
                  onClick={updateInformation}
                >
                  Up
                </button>
                <button className="buttons_pack button_delete_info">X</button>
              </div>

              <div className="inpuBox_login">
                <div className="inpuBox_login2">
                  <input
                    type="file"
                    onChange={(e) => {
                      setFiles(e.target.files[0]);
                    }}
                    name="file"
                  />
                  <button
                    className="buttons_pack button_update_info"
                    onClick={updateInformation}
                  >
                    Up
                  </button>
                </div>
              </div>
              <div className="buttons_container">
                <GeneralButton handleSubmit={handleSubmitInformation} />
              </div>
            </form>
            <hr />
            {stateInformation?.items.length > 0 && (
              <div className="if_exist_items">
                <p>Items:</p>
                <ul className="if_exist_items_ul">
                  {stateInformation?.items.map((item) => {
                    return <li key={Math.random()}>{item}</li>;
                  })}
                </ul>
              </div>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardToCreateInformationPage;
