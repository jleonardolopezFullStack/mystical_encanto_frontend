import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/productlist.css";
import { useCartStore } from "../../store/cartStore";
import { categoryAndProductStore } from "../../store/generalStore";

const ProductList = ({ category }) => {
  const categoryId = category._id;
  const [selectedButtonIndexImg, setSelectedButtonIndexImg] = useState({
    url: "",
    price: "",
    size: "",
    discount: "",
  });
  const [variant, setvariant] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(`---`);
  const { generalProduct } = categoryAndProductStore((state) => ({
    generalProduct: state.generalProduct,
  }));
  const { stateCart, totalQuantity } = useCartStore((state) => ({
    stateCart: state.stateCart,
    totalPrice: state.totalPrice,
    totalQuantity: state.totalQuantity,
  }));

  const {
    handleStateCartSummaryPrice,
    handleStateCartAddToValue,
    handleStateCartNewValue,
  } = useCartStore();

  //console.log(stateCart);

  const handleAddCart = (e) => {
    e.preventDefault();

    if (selectedProduct !== "---") {
      const data = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        discount: selectedProduct.discount,
        idStripe: selectedProduct.idStripe,
      };
      const findNameCart = stateCart.find((i) => {
        if (i.name === data.name) {
          return true;
        }
      });
      if (!findNameCart) {
        handleStateCartNewValue(data);
        handleStateCartSummaryPrice();
        toast.success("Product has been added to the Cart");
      } else {
        stateCart.map((i) => {
          i.name === data.name
            ? i.quantity++ &&
              handleStateCartAddToValue(i) &&
              handleStateCartSummaryPrice()
            : toast.success("One product has been added to the Cart");
        });
      }
    } else {
      toast.success("This product is sold out :(");
      ///////////// Aqui tenemos que hacer un pop up de que no hay precio /////
      console.log("Sold out ...");
    }
  };

  const handleChangeCart = async (cartProduct) => {
    const res3 = await generalProduct.find((item) =>
      /*  item.variant === cartProduct?.size &&           NO BORRAR: SOLO QUITE ESTA PARTE Y SE QUITO LA OPCION DE SELECCIONAR EL SIZE PARA QUE APAREZCA EL PRECIO. ESTA PARTE ES BUEBA CUANDO TENGA UN PRODUCTO CON 2 VARIANTES*/
      item.urlCloudinary.includes(cartProduct?.url)
    );
    res3 ? setSelectedProduct(res3) : setSelectedProduct("---");
  };

  const handleButtonClickImg = (url) => {
    setSelectedButtonIndexImg({
      ...selectedButtonIndexImg,
      url: url,
    });
  };

  const handleButtonClicksize = (size) => {
    setSelectedButtonIndexImg({
      ...selectedButtonIndexImg,
      size: size,
    });
  };

  const findProductInCategory = async () => {
    const res3 = await generalProduct.filter((product) => {
      if (categoryId === product.category._id) {
        return {};
      }
    });

    if (res3) {
      setProducts(res3);
    }
    const res4 = await res3.map((variant) => {
      return variant.variant;
    });
    const sinRepetir = [...new Set(res4)];
    if (sinRepetir) {
      setvariant(sinRepetir);
    }
  };
  //console.log(products[0]?.urlCloudinary[0]);
  useEffect(() => {
    findProductInCategory();
    handleChangeCart(selectedButtonIndexImg);
  }, [selectedButtonIndexImg]);

  return (
    <div className="productList">
      <ul className="thumb1">
        {products.map((product, index) => {
          if (index >= 0 && index <= 2) {
            return (
              <li
                className="colorLi"
                key={product.id}
                style={{
                  backgroundColor:
                    selectedButtonIndexImg.url === product.urlCloudinary[0]
                      ? "rgb(255, 255, 255, 0.7)"
                      : "rgb(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
              >
                <img
                  key={product.id}
                  onClick={() => handleButtonClickImg(product.urlCloudinary[0])}
                  alt=""
                  src={`${product.urlCloudinary[0]}`}
                  id={`${product.idCloudinary[0]}`}
                />
              </li>
            );
          }
        })}
      </ul>

      <ul className="thumb2">
        {products.map((product, index = 3) => {
          if (index >= 3 && index <= 5) {
            return (
              <li
                className="colorLi"
                key={product.id}
                style={{
                  backgroundColor:
                    selectedButtonIndexImg.url === product.urlCloudinary[0]
                      ? "rgb(255, 255, 255, 0.7)"
                      : "rgb(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
              >
                <img
                  key={product.id}
                  onClick={() => handleButtonClickImg(product.urlCloudinary[0])}
                  alt=""
                  src={`${product.urlCloudinary[0]}`}
                  id={`${product.idCloudinary[0]}`}
                />
              </li>
            );
          }
        })}
      </ul>

      <div className="imgBox">
        <h2>{category.name}</h2>
        <img
          src={
            selectedButtonIndexImg.url
              ? selectedButtonIndexImg.url
              : products[0]
                  ?.urlCloudinary[0] /*  "https://res.cloudinary.com/dy1nquo4w/image/upload/v1690415061/a0b6lqmtexdorwybwsac.png" */
          }
        />

        {/*         <ul className="size">
          <span>Size</span>
          {variant.map((size) => (
            <li
              key={size}
              onClick={() => handleButtonClicksize(size)}
              style={{
                backgroundColor:
                  selectedButtonIndexImg.size === size
                    ? "rgb(255, 255, 255, 0.7)"
                    : "rgb(255, 255, 255, 0.2)",
                cursor: "pointer",
              }}
            >
              {size}
            </li>
          ))}
        </ul> NO BORRAR: SOLO QUITE ESTA PARTE Y SE QUITO LA OPCION DE SELECCIONAR EL SIZE PARA QUE APAREZCA EL PRECIO. ESTA PARTE ES BUEBA CUANDO TENGA UN PRODUCTO CON 2 VARIANTES*/}
        <Link
          to="#"
          className="btn_product"
          onClick={(e) => handleAddCart(e)}
          /* onClick={() => handleChangeCart(prepareCart)} */
        >
          Add to the cart
          <div className="price">{`$ ${selectedProduct?.price || "---"}`}</div>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
