import { NavLink, useNavigate } from "react-router-dom";
import "../styles/controlpanelpage.css";
import { ToastContainer, toast } from "react-toastify";
import CardToCreateProduct from "../components/CardToCreateProduct";
import CardToCreateCategory from "../components/CardToCreateCategory";
import CardToCreateMainPage from "../components/CardToCreateMainPage";
import CardToCreateInformationPage from "../components/CardToCreateInformationPage";
import CardToCreateGalleryPage from "../components/CardToCreateGalleryPage";
import CardToCreateColors from "../components/CardToCreateColors";

const ControlPanelPage = () => {
  /*   const navigate = useNavigate();
  const onLogin = () => {
    navigate("/", {
      replace: true,
    });
  }; */

  /////////////////////////////////////////////////////////////////

  return (
    <>
      <section className="section_loginn">
        <div className="color_login"></div>
        <div className="color_login"></div>
        <div className="color_login"></div>
        <div className="page_controlpanel">
          <h1 className="title_controlpanel">Control Panel</h1>
          <div className="box_container">
            <CardToCreateCategory />
            <CardToCreateProduct />
            <CardToCreateMainPage />
            <CardToCreateInformationPage />
            <CardToCreateGalleryPage />
            <CardToCreateColors />
            <ToastContainer />
          </div>
        </div>
      </section>
    </>
  );
};

export default ControlPanelPage;
