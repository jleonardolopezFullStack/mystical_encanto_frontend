import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbarpursehome.css";
import Cartpage from "../../products/pages/CartPage";
import { generalColorStore } from "../../store/generalStore";
import logo from "../../assets/logo_dani_noback.png";

const NavbarPurseHome = ({ menuItems }) => {
  const [btnClassOpenDropdown_menu, setbtnClassOpenDropdown_menu] =
    useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { NavbarAndFotterColor } = generalColorStore((state) => ({
    NavbarAndFotterColor: state.NavbarAndFotterColor,
  }));

  //console.log(NavbarAndFotterColor);

  const handleClickDropdown_menu = () => {
    setbtnClassOpenDropdown_menu(
      (btnClassOpenDropdown_menu) => !btnClassOpenDropdown_menu
    );
  };
  let toggleClassCheck = btnClassOpenDropdown_menu ? "open" : "";

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const onLogout = () => {
    navigate("/login", {
      replace: true, // Esta parte evite que si se quiere devolver a la pagina, esto lo evita
    });
  };

  //console.log(menuItems);
  return (
    <>
      <header>
        <div
          className="navbar"
          style={{
            background: `linear-gradient(90deg, ${NavbarAndFotterColor.color1}, ${NavbarAndFotterColor.color2})`,
          }}
        >
          <div className="logo">
            <NavLink style={{ "--clr": "#c56cf0" }} to="/login">
              <img src={logo} alt="" className="img_logo" />
            </NavLink>
          </div>
          <ul className="links">
            {menuItems.map((menu) => {
              return (
                <li key={Math.random()}>
                  <NavLink
                    onClick={() => {
                      scrollToSection(menu.service);
                    }}
                  >
                    {menu.title}
                  </NavLink>
                </li>
              );
            })}
            {/*             <li>
              <NavLink to="/login">footer</NavLink>
            </li> */}
          </ul>

          <NavLink className="action_btn" onClick={handleShow}>
            <i className="fa-solid fa-cart-shopping"></i>
          </NavLink>

          <div
            className={`toggle_btn ${toggleClassCheck}`}
            onClick={handleClickDropdown_menu}
          >
            {toggleClassCheck ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>
        </div>

        <div className={`dropdown_menu ${toggleClassCheck}`}>
          {menuItems.map((menu) => {
            return (
              <li key={Math.random()}>
                <NavLink
                  onClick={() => {
                    scrollToSection(menu.service);
                  }}
                >
                  {menu.title}
                </NavLink>
              </li>
            );
          })}
          {/*        <li>
            <NavLink to="/login">footer</NavLink>
          </li> */}
          <li className="action_btn_nonbackground">
            <NavLink className="action_btn" onClick={handleShow}>
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
        </div>
      </header>
      <Cartpage show={show} handleClose={handleClose} />
    </>
  );
};

export default NavbarPurseHome;
