import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "../styles/producthomepageTesting.css";
import ProductList from "../components/ProductList";
import { generalColorStore } from "../../store/generalStore";

const ProductHomePageTesting = ({ menu, categorys }) => {
  const [activeButton, setActiveButton] = useState(null);
  const { productPageColor } = generalColorStore((state) => ({
    productPageColor: state.productPageColor,
  }));

  console.log(categorys);
  const handleClick = (buttonId) => {
    setActiveButton(buttonId === activeButton ? null : buttonId);
  };

  return (
    <div
      className="container_slider"
      ref={menu.service}
      style={{
        background: `linear-gradient(90deg, ${productPageColor.color1}, ${productPageColor.color2})`,
      }}
    >
      <div className="tabs">
        {categorys.map((product) => (
          <input
            key={product._id}
            id={product._id}
            type="radio"
            name="slider"
            onChange={() => handleClick(product._id)}
            checked={product._id === activeButton}
          />
        ))}
      </div>

      <div className="buttons">
        {categorys.map((product) => (
          <label
            key={product._id}
            htmlFor={product._id}
            className={activeButton === product._id ? "extend" : ""}
          ></label>
        ))}
      </div>

      <div className="content">
        {categorys.map((product, index) => (
          <div
            style={{
              /*   background: `linear-gradient(90deg, #f1916D, #BD83B8)`, */
              background: `linear-gradient(90deg, ${product.color1}, ${product.color2})`,
            }}
            key={product._id}
            className={`box ${product._id} ${
              activeButton === product._id ? "extend" : ""
            }`}
          >
            {index === 0 && activeButton !== product._id ? (
              <ProductList category={product} />
            ) : (
              activeButton === product._id && <ProductList category={product} />
            )}
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductHomePageTesting;
