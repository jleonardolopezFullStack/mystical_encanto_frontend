import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import PurseHomePage from "../pages/PurseHomePage";
import NavbarPurseHome from "../../UI/components/NavbarPurseHome";
import { generalColorStore } from "../../store/generalStore";
import * as axiosService from "../../services/axiosServices";

const ProductRoutes = () => {
  const main = useRef(null);
  const product = useRef(null);
  const packaging = useRef(null);
  const gallery = useRef(null);

  const {
    NavbarAndFotterColor,
    dashboardPageColor,
    productPageColor,
    galleryColor,
    cartColor,
    lettersColor,
  } = generalColorStore((state) => ({
    NavbarAndFotterColor: state.NavbarAndFotterColor,
    dashboardPageColor: state.dashboardPageColor,
    productPageColor: state.productPageColor,
    galleryColor: state.galleryColor,
    cartColor: state.cartColor,
    lettersColor: state.lettersColor,
  }));

  const {
    getNavbarAndFotterColor,
    getDashboardPageColor,
    getProductPageColor,
    getGalleryColor,
    getCartColor,
    getLettersColor,
  } = generalColorStore();

  const gettingGeneralColors = async () => {
    try {
      const res = await axiosService.getColorsService();
      //console.log(res.data.colors[1][0].colorNavbar.color1);
      const navbarAndFotterColorFromService = {
        color1: res?.data?.colors[1][0].colorNavbar.color1,
        color2: res?.data?.colors[1][0].colorNavbar.color2,
      };
      const dashboardColorFromService = {
        color1: res?.data?.colors[1][0].colorDashboard.color1,
        color2: res?.data?.colors[1][0].colorDashboard.color2,
      };
      const productColorFromService = {
        color1: res?.data?.colors[1][0].colorProduct.color1,
        color2: res?.data?.colors[1][0].colorProduct.color2,
      };
      const galleryColorFromService = {
        color1: res?.data?.colors[1][0].colorGallery.color1,
        color2: res?.data?.colors[1][0].colorGallery.color2,
      };
      const CartColorFromService = {
        color1: res?.data?.colors[1][0].colorCart.color1,
        color2: res?.data?.colors[1][0].colorCart.color2,
      };
      const LettersColorFromService = {
        color1: res?.data?.colors[1][0].colorLetters.color1,
        color2: res?.data?.colors[1][0].colorLetters.color2,
      };

      getNavbarAndFotterColor(navbarAndFotterColorFromService);
      getDashboardPageColor(dashboardColorFromService);
      getProductPageColor(productColorFromService);
      getGalleryColor(galleryColorFromService);
      getCartColor(CartColorFromService);
      getLettersColor(LettersColorFromService);

      //console.log(NavbarAndFotterColor);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: "Main",
      link: "/main",
      color: "#f5D7DB",
      service: main,
    },

    {
      id: 4,
      title: "Products",
      link: "/products",
      color: "#BD83B8",
      service: product,
    },
    {
      id: 5,
      title: "Packaging",
      link: "/packaging",
      color: "#473E66",
      service: packaging,
    },
    {
      id: 2,
      title: "Room show",
      link: "/Room_show",
      color: "#1B3358",
      service: gallery,
    },
  ];

  useEffect(() => {
    gettingGeneralColors();
  }, []);

  return (
    <>
      <NavbarPurseHome menuItems={menuItems} />
      <Routes>
        <Route
          path="home"
          element={<PurseHomePage menuItems={menuItems} service={product} />}
        />
        {/*         <Route
          path="slider"
          element={<ProductHomePageTesting menuItems={menuItems} />}
        /> */}
      </Routes>
    </>
  );
};

export default ProductRoutes;
