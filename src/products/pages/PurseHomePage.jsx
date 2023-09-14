import { useEffect, useState } from "react";
import "../styles/pursehomepage.css";
import ProductHomePageTesting from "./ProductHomePageTesting";
import * as axiosService from "../../services/axiosServices";
import { categoryAndProductStore } from "../../store/generalStore";
import DashboardPage from "./DashboardPage";
import InformationProductPage from "./InformationProductPage";
import SliderPage from "./SliderPage";

const PurseHomePage = ({ menuItems }) => {
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);

  const { generalCategory, generalProduct } = categoryAndProductStore(
    (state) => ({
      generalCategory: state.generalCategory,
      generalProduct: state.generalProduct,
    })
  );
  const { getProducts, getCategory } = categoryAndProductStore();

  const loadCategorys = async () => {
    const res = await axiosService.getCategorysService();
    setCategorys(res.data.categorys[1]);
    getCategory(res.data.categorys[1]);
  };

  const loadProducts = async () => {
    try {
      const res = await axiosService.getProductsService();
      setProducts(res.data.product[1]);
      getProducts(res.data.product[1]);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  /*   return (
    <>
      {menuItems.map((menu) => {
        return (
          <div
            ref={menu.service}
            className="pursehome"
            style={{ "--clr": menu.color }}
            id={`${menu.title}_${menu.id}`}
          >
            <h1 className="content-header" id={menu.title}>
              {menu.title}
            </h1>
          </div>
        );
      })}
    </>
  ); */

  useEffect(() => {
    loadCategorys();
    loadProducts();
  }, []);
  //console.log(generalProduct);
  return (
    <>
      <DashboardPage menu={menuItems[0]} product={generalProduct} />
      <ProductHomePageTesting menu={menuItems[1]} categorys={categorys} />

      <InformationProductPage
        menu={menuItems[2]}
        categorys={categorys}
        products={products}
      />

      <SliderPage menu={menuItems[3]} products={products} />
    </>
  );
};

export default PurseHomePage;
