import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import "../styles/cancelpage.css";

const CancelPage = () => {
  const { handleDeleteLocalStorageCart } = useCartStore();

  useEffect(() => {
    console.log("entro");
    handleDeleteLocalStorageCart();
  }, []);

  return (
    <section className="section_cancel">
      <div className="color_login"></div>
      <div className="color_login"></div>
      <div className="color_login"></div>
      <div className="box_login">
        <div className="square_box" style={{ "--i": 0 }}></div>
        <div className="square_box" style={{ "--i": 1 }}></div>
        <div className="square_box" style={{ "--i": 2 }}></div>
        <div className="square_box" style={{ "--i": 3 }}></div>
        <div className="square_box" style={{ "--i": 4 }}></div>
        <div className="container_success">
          <div className="form_success">
            <h4>
              Warning!<span>&#128534; &#128548; &#128549;</span>
            </h4>
            <br />
            <p>
              Sorry, something went wrong with your payment{" "}
              <span>&#128565;</span>, please try again or contact us for any
              requirement <span>&#128373;</span>
              <br />
              <br />
              <ul className="sci_success">
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
              <br />
              <a href="/" className="alert-link">
                Get back to Home page <span>&#128640;</span>
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CancelPage;
