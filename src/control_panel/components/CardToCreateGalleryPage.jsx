import React, { useEffect, useState } from "react";
import FormData from "form-data";
import { toast } from "react-toastify";
import * as axiosService from "../../services/axiosServices";
import "../styles/cardtocreategallerypage.css";

const CardToCreateGalleryPage = () => {
  const [stateGallery, setStateGallery] = useState();
  const [files, setFiles] = useState(null);
  const [verifyRequest, setVerifyRequest] = useState("");

  const gettingGalleryFromService = async () => {
    const res = await axiosService.getSliceImgPageService();
    //console.log(res.data.gallery[1]);
    return setStateGallery(res.data.gallery[1]);
  };

  const reload = () => {
    window.location.reload();
  };
  const handleSubmitGalleryPage = async (e) => {
    e.preventDefault();
    const verifyToken = localStorage.getItem("token");
    try {
      let formdata = new FormData();
      formdata.append("image", files);
      const res = await axiosService.postGalleryService(formdata, verifyToken);
      console.log(res);
      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Product have been created");
      }
      setTimeout(reload, 2000);
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequest(error?.response?.statusText);
      }
    }
  };

  const deleteImgGallery = async (e) => {
    const idCloudinary = e.target.name;
    //console.log(idCloudinary);
    const verifyToken = localStorage.getItem("token");
    try {
      const res = await axiosService.deleteGalleryService(
        idCloudinary,
        verifyToken
      );
      //console.log(res);
      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Product have been deleted");
      }
      setTimeout(reload, 2000);
    } catch (error) {
      console.log(error?.response);
      if (
        error?.response?.statusText === "Bad Request" ||
        error?.response?.statusText === "Unauthorized"
      ) {
        setVerifyRequest(error?.response.statusText);
      }
    }
  };

  useEffect(() => {
    gettingGalleryFromService();
  }, []);
  return (
    <>
      <div className="box_login">
        <div className="container_login">
          <div className="form_login">
            <div className="texts_card_controlpanel">
              <h2>Step 5</h2>
              <h2>Create Slider Page</h2>
            </div>
            <p>* Image 500x500px whithout background</p>
            <hr />

            <form action="">
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
                    onClick={handleSubmitGalleryPage}
                  >
                    Up
                  </button>
                </div>
              </div>
            </form>
            <br />
            <div className="container_mainpage_image">
              <ul className="ul_products">
                {stateGallery ? (
                  stateGallery.map((i) => {
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
                            onClick={deleteImgGallery}
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
            {(verifyRequest === "Bad Request" ||
              verifyRequest === "Unauthorized") && (
              <div className="badRequest_login">
                <p>
                  <span>{verifyRequest}</span>, Credential Wrong, Check and try
                  again
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardToCreateGalleryPage;
