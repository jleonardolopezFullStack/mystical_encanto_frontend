import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GeneralButton from "./GeneralButton";
import * as axiosService from "../../services/axiosServices";
import "../styles/cardtocreatecolors.css";

const CardToCreateColors = () => {
  const [navbarColor, setNavbarColor] = useState(null);
  const [dashboardColor, setDashboardColor] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [galleryColor, setGalleryColor] = useState(null);
  const [cartColor, setCartColor] = useState(null);
  const [lettersColor, setLettersColor] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState();
  const [verifyRequest, setVerifyRequest] = useState("");

  /*   const gettingCategoryFromService = async () => {
    const res = await axiosService.getCategorysService();
    //console.log(res.data);
    return setStateCategory(res.data.categorys[1]);
  }; */
  const generalColorHandle = (e, vari, setColor) => {
    setColor({ ...vari, [e.target.name]: e.target.value });
  };

  const reload = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifyToken = localStorage.getItem("token");
      //console.log(verifyToken);
      const data = {
        colorNavbar: navbarColor,
        colorDashboard: dashboardColor,
        colorProduct: productColor,
        colorGallery: galleryColor,
        colorCart: cartColor,
        colorLetters: lettersColor,
      };

      const res = await axiosService.postColorsService(data, verifyToken);

      console.log(res.statusText);
      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Category have been created");
      }
      /*  setTimeout(reload, 2000); */
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

  const handleUpdateColor = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const verifyToken = localStorage.getItem("token");
    console.log(name);
    try {
      const res = await axiosService.getColorsService();
      const id = res.data.colors[1][0]._id;
      //console.log(res.data.colors[1][0]._id);
      const newNavbarColor = JSON.stringify(navbarColor);
      const newDashboardColor = JSON.stringify(dashboardColor);
      const newProductColor = JSON.stringify(productColor);
      const newGalleryColor = JSON.stringify(galleryColor);
      const newCartColor = JSON.stringify(cartColor);
      const newLettersColor = JSON.stringify(lettersColor);

      let formdata = new FormData();

      newNavbarColor !== null && formdata.append("colorNavbar", newNavbarColor);
      newDashboardColor !== null &&
        formdata.append("colorDashboard", newDashboardColor);
      newProductColor !== null &&
        formdata.append("colorProduct", newProductColor);
      newGalleryColor !== null &&
        formdata.append("colorGallery", newGalleryColor);
      newCartColor !== null && formdata.append("colorCart", newCartColor);
      newLettersColor !== null &&
        formdata.append("colorLetters", newLettersColor);

      const res2 = await axiosService.putColorService(
        formdata,
        verifyToken,
        id
      );
      console.log(res2);
      setNavbarColor(null);
      setDashboardColor(null);
      setProductColor(null);
      setGalleryColor(null);
      setCartColor(null);
      setLettersColor(null);

      if (res.statusText === "OK") {
        setVerifyRequest("");
        toast.success("Product have been deleted");
      }
      /*      setTimeout(reload, 1500); */
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

  useEffect(() => {}, []);
  return (
    <div className="box_login">
      <div className="container_login">
        <div className="form_login">
          <div className="texts_card_controlpanel">
            <h2>Step 6</h2>
            <h2>Create Colors</h2>
          </div>
          <p>
            * Each Color represent each section page.
            <br />* Hexagonal parameters colours Ex:#000fff
          </p>
          <hr />
          <form action="" encType="multipart/form-data">
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Navbar</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, navbarColor, setNavbarColor)
                }
                value={navbarColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, navbarColor, setNavbarColor)
                }
                value={navbarColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Dashboard</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, dashboardColor, setDashboardColor)
                }
                value={dashboardColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, dashboardColor, setDashboardColor)
                }
                value={dashboardColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Products</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, productColor, setProductColor)
                }
                value={productColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, productColor, setProductColor)
                }
                value={productColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Gallery</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, galleryColor, setGalleryColor)
                }
                value={galleryColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, galleryColor, setGalleryColor)
                }
                value={galleryColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Cart</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) => generalColorHandle(e, cartColor, setCartColor)}
                value={cartColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) => generalColorHandle(e, cartColor, setCartColor)}
                value={cartColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="choose_colours_section">
              <p>Letters</p>
              <input
                type="text"
                placeholder="Color 1"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, lettersColor, setLettersColor)
                }
                value={lettersColor?.color1}
                name="color1"
              />
              <input
                type="text"
                placeholder="Color 2"
                className="choose_colours_section_input"
                onChange={(e) =>
                  generalColorHandle(e, lettersColor, setLettersColor)
                }
                value={lettersColor?.color2}
                name="color2"
              />
              <div className="buttons_info_container ">
                <button
                  className="buttons_pack button_update_info"
                  onClick={handleUpdateColor}
                >
                  Up
                </button>
              </div>
            </div>
            {/*    /////////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
            <div className="buttons_container">
              <GeneralButton handleSubmit={handleSubmit} />
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

export default CardToCreateColors;
