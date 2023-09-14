import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCartStore } from "../../store/cartStore";
import "../styles/cartpage.css";
import { generalColorStore } from "../../store/generalStore";
import logo from "../../assets/logo_dani_noback.png";

function Cartpage({ show, handleClose }) {
  const stateCartToBuy = useCartStore.getState().stateCart;
  //console.log(stateCartToBuy);
  //const stateNew = window.localStorage.getItem("state");
  const { stateCart, totalPrice, totalQuantity, totalDiscount } = useCartStore(
    (state) => ({
      stateCart: state.stateCart,
      totalPrice: state.totalPrice,
      totalQuantity: state.totalQuantity,
      totalDiscount: state.totalDiscount,
    })
  );

  const {
    handleStateCartdeleteAll,
    handleStateCartdeleteToValue,
    handleStateCartSummaryPrice,
    handleStateCartAddToValue,
    handleStateCartNewValue,
  } = useCartStore();

  const { cartColor } = generalColorStore((state) => ({
    cartColor: state.cartColor,
  }));

  const handleDeleteOneProduct = (value) => {
    handleStateCartdeleteToValue(value);
  };

  const handleRestCart = (item) => {
    const data = {
      name: item.name,
      price: item.price,
    };

    const findNameCart = stateCart.find((i) => {
      if (i.name === data.name) {
        return true;
      }
    });
    //console.log(findNameCart);
    if (findNameCart.quantity === 1) {
      handleDeleteOneProduct(item.name);
      console.log("llego a 1");
    } else {
      const newCart = stateCart.map((i) => {
        i.name === data.name
          ? i.quantity-- &&
            handleStateCartAddToValue(i) &&
            handleStateCartSummaryPrice()
          : console.log("no hola");
      });
    }
  };

  const handleAddCart = (item) => {
    console.log(item);
    const data = {
      name: item.name,
      price: item.price,
    };

    const findNameCart = stateCart.find((i) => {
      if (i.name === data.name) {
        return true;
      }
    });
    if (!findNameCart) {
      handleStateCartNewValue(data);
      handleStateCartSummaryPrice();
    } else {
      const newCart = stateCart.map((i) => {
        i.name === data.name
          ? i.quantity++ &&
            handleStateCartAddToValue(i) &&
            handleStateCartSummaryPrice()
          : console.log("no hola");
      });
    }
  };

  const checkout = async () => {
    const url_testing =
      //"https://janmoviesbackend-production.up.railway.app/checkout";
      // "https://firststripebackend-production.up.railway.app/checkout";
      "http://localhost:3001/checkout";
    await fetch(url_testing, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /*  "Access-Control-Allow-Origin": "*", */
      },
      body: JSON.stringify({ items: stateCartToBuy }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className="modal-cart"
          style={{
            "--color1": `${cartColor.color1}`,
            "--color2": `${cartColor.color2}`,
          }}
        >
          <Modal.Title className="modal_title">
            {/* <p>DARAVE CRAFT</p> */}
            <img src={logo} alt="" className="img_logo" />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="modal-cart"
          style={{
            "--color1": `${cartColor.color1}`,
            "--color2": `${cartColor.color2}`,
          }}
        >
          <div
            className="cart modal-cart"
            style={{
              "--color1": `${cartColor.color1}`,
              "--color2": `${cartColor.color2}`,
            }}
          >
            <h1 className="titleCart">Shopping Cart</h1>
            <hr className="hr" />
            <div className="title">
              <h4>Product</h4>
              <h4>Price ea</h4>
              <h4>Quantity</h4>

              <h4>Delete</h4>
            </div>
            <hr className="hr" />

            {stateCartToBuy
              ? stateCartToBuy.map((cart) => {
                  return (
                    <ul className="list-group ul-cart" key={cart?.name}>
                      <li
                        className="list-group-item d-flex align-items-center liCart modal-cart forpadding"
                        style={{ borderColor: "green" }}
                      >
                        <span className="product-cart">{cart?.name}</span>
                        <span className="badge bg-primary ea-price">
                          {cart?.price /* .toFixed(2) */}
                        </span>
                        <span className="badge bg-primary quantity-cart">
                          {cart?.quantity}
                        </span>

                        <div className="buttons-cart">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteOneProduct(cart.name)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={() => handleAddCart(cart)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={() => handleRestCart(cart)}
                          >
                            -
                          </button>
                        </div>
                      </li>
                      <hr className="hr" />
                    </ul>
                  );
                })
              : console.log("Empty cart")}
            <hr className="hr" />
            <ul className="total">
              <li>TOTAL CART</li>
              <li>{`$ ${totalPrice} AUD`}</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer
          className="modal-cart"
          style={{
            "--color1": `${cartColor.color1}`,
            "--color2": `${cartColor.color2}`,
          }}
        >
          <Button variant="primary" onClick={checkout}>
            Check Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cartpage;
