import { useEffect, useState } from "react";
import "../styles/informationProductPage.css";
import * as axiosService from "../../services/axiosServices";

const InformationProductPage = ({ menu }) => {
  const [information, setInformation] = useState([]);

  const loadGallery = async () => {
    try {
      const res = await axiosService.getInformationPageService();
      setInformation(res.data.information[1]);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  // console.log(information);

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div ref={menu.service} className="info_product">
      <div className="information">
        <div className="general-info">
          <div className="packaging">
            <h3>Description</h3>
            <p>{information[0]?.description}</p>
          </div>
          <div className="description">
            <h3>Product Bundle</h3>
            <ul>
              {information[0]?.items.map((item) => (
                <li key={Math.random()}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="img-packaging"
          /*      style={{ backgroundImage: information[0]?.urlCloudinary }} */
        >
          <img src={information[0]?.urlCloudinary} alt="" />
        </div>
      </div>
    </div>
  );
};

export default InformationProductPage;
