import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as axiosService from "../../services/axiosServices";
import "../styles/dashboardpage.css";
import { generalColorStore } from "../../store/generalStore";

const DashboardPage = ({ menu }) => {
  const [img, setImg] = useState([]);
  const [imgMain, setImgMain] = useState("");
  const { dashboardPageColor } = generalColorStore((state) => ({
    dashboardPageColor: state.dashboardPageColor,
  }));

  const loadProducts = async () => {
    try {
      const res = await axiosService.getMainpageService();
      setImg(res.data.mainpage[1]);
      //console.log(img);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleImgMain = (img) => {
    setImgMain(img);
  };

  const scrollToSection = () => {
    window.scrollTo(0, 700, {
      behavior: "smooth",
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div
        className="circle"
        style={
          imgMain === ""
            ? { background: img[0]?.color }
            : { "--clrmain": imgMain.color }
        }
      ></div>
      <div
        ref={menu.service}
        className="dashboard"
        id={`${menu.title}_${menu.id}`}
        style={{
          background: `linear-gradient(90deg, ${dashboardPageColor.color1}, ${dashboardPageColor.color2})`,
        }}
      >
        <div className="textBox">
          <h2>
            Creative and happiness<br></br>Just in one purse<br></br>
            <span
              style={
                imgMain === ""
                  ? { color: img[0]?.color }
                  : { "--clrspan": imgMain.color }
              }
            >
              DanielaCraft
            </span>
          </h2>
          <p className="small_description_in_mainpage">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ab
            quam dolorum quod modi
          </p>
          <Link to="#" onClick={scrollToSection}>
            See Products
          </Link>
        </div>
        <div className="imgBox">
          {/* {imgMain === ''? */}
          <img
            src={imgMain === "" ? img[0]?.urlCloudinary : imgMain.urlCloudinary}
            alt=""
            className="imgMain"
          />
        </div>
        <ul className="thumbs_dashboard">
          {img &&
            img.map((image) => {
              return (
                <li onClick={() => handleImgMain(image)} key={Math.random()}>
                  <img src={image.urlCloudinary} alt="" />
                </li>
              );
            })}
        </ul>
        <ul className="sci">
          <li>
            <a href="https://www.facebook.com/profile.php?id=61550538222784&mibextid=eBUYbo">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/daravecraft/">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-brands fa-etsy"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardPage;
