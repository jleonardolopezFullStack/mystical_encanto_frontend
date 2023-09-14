import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import * as axiosService from "../../services/axiosServices";
import "../styles/sliderpage.css";
import logo from "../../assets/logo_dani_noback.png";
import { Pagination, EffectCoverflow } from "swiper/modules";
import { generalColorStore } from "../../store/generalStore";

const SliderPage = ({ menu, products }) => {
  const [imagesGallery, setImagesGallery] = useState([]);
  const { NavbarAndFotterColor, galleryColor } = generalColorStore((state) => ({
    NavbarAndFotterColor: state.NavbarAndFotterColor,
    galleryColor: state.galleryColor,
  }));

  const loadGallery = async () => {
    try {
      const res = await axiosService.getSliceImgPageService();
      //console.log(res.data.gallery[1]);
      setImagesGallery(res.data.gallery[1]);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  //console.log(imagesGallery);
  //console.log(products[1].urlCloudinary[0]);
  //const sliderImages = [];

  useEffect(() => {
    loadGallery();
  }, []);
  return (
    <>
      <div
        className="container_slider_image"
        ref={menu.service}
        style={{
          background: `linear-gradient(90deg, ${galleryColor.color1}, ${galleryColor.color2})`,
        }}
      >
        <h1 className="heading">Room Show</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {imagesGallery.map((img) => {
            return (
              <SwiperSlide key={Math.random()}>
                <img src={img.urlCloudinary} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <footer
          style={{
            background: `linear-gradient(90deg, ${NavbarAndFotterColor.color1}, ${NavbarAndFotterColor.color2})`,
          }}
        >
          <div className="container_img_logo">
            <img src={logo} alt="" className="img_logo" />
          </div>
          <ul className="sci_footer">
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

          {/*           <NavLink style={{ "--clr": "#c56cf0" }} to="/login">
            MHYSTICAL ENCANTO
          </NavLink> */}
        </footer>
      </div>
    </>
  );
};

export default SliderPage;
