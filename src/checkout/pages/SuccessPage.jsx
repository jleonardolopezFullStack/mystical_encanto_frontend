import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import "../styles/successpage.css";

const SuccessPage = () => {
  const { handleDeleteLocalStorageCart } = useCartStore();

  useEffect(() => {
    console.log("entro");
    handleDeleteLocalStorageCart();
  }, []);

  return (
    <section className="section_login">
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
              Successful Amazing Purchase!
              <span>&#127880; &#127881; &#10024;</span>
            </h4>

            <br />
            <p>
              Thank you for choosing our product <span>&#128525;</span>, please
              do not hesitates to contact if you have any questions or need
              assistance. <span>&#128373;</span>
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

export default SuccessPage;
