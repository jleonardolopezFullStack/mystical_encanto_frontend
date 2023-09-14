import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/loginpage.css";
import * as axiosService from "../../services/axiosServices";

const LoginPage = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [verifyRequest, setVerifyRequest] = useState("");

  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/", {
      replace: true,
    });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosService.getLoginService(userLogin);
      //console.log(res.data.token);
      console.log(res);
      console.log(res.statusText);
      localStorage.setItem("token", res.data.token);
      const verifyToken = localStorage.getItem("token");
      //console.log(verifyToken);

      const handleNavigate = () => {
        navigate("/controlpanel", {
          replace: true,
        });
      };

      verifyToken ? handleNavigate() : navigate(`/`);
    } catch (error) {
      console.log(error.response);
      if (error.response.statusText === "Bad Request") {
        setVerifyRequest(error.response.statusText);
      }
    }
  };
  //console.log(userLogin);
  //console.log(verifyRequest);
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
        <div className="container_login">
          <div className="form_login">
            <h2>Login Form</h2>
            <form action="">
              <div className="inpuBox_login">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => handleInputChange(e)}
                  value={userLogin?.email}
                  name="email"
                />
              </div>
              <div className="inpuBox_login">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleInputChange(e)}
                  value={userLogin?.password}
                  name="password"
                />
              </div>
              <div className="inpuBox_login" onClick={handleSubmit}>
                <input type="submit" value="login" />
              </div>
              <p className="forget_login">
                Forgot Password? <NavLink to="#">Click Here</NavLink>
              </p>
              <p className="forget_login">
                Don't have an account? <NavLink to="#">Sign up</NavLink>
              </p>
              {verifyRequest === "Bad Request" && (
                <div className="badRequest_login">
                  <p>Credential Wrong, Check and try again</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
