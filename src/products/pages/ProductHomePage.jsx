import { useState } from "react";
import "../styles/producthomepage.css";

const ProductHomePage = () => {
  const [checkedButton1, setcheckedButton1] = useState(false);
  const [checkedButton2, setcheckedButton2] = useState(false);
  const [checkedButton3, setcheckedButton3] = useState(false);
  const [checkProductScenario, setCheckProductScenario] = useState(false);

  const handleClick1 = () => {
    setcheckedButton1((checkedButton1) => !checkedButton1);
    setCheckProductScenario((checkProductScenario) => !checkProductScenario);
    setcheckedButton2(false);
    setcheckedButton3(false);
  };
  const handleClick2 = () => {
    setcheckedButton2((checkedButton2) => !checkedButton2);
    setcheckedButton1(false);
    setcheckedButton3(false);
  };
  const handleClick3 = () => {
    setcheckedButton3((checkedButton3) => !checkedButton3);
    setcheckedButton1(false);
    setcheckedButton2(false);
  };

  let toggleClassCheckBox1 = checkedButton1 ? "extend" : "";
  let toggleClassCheckBox2 = checkedButton2 ? "extend" : "";
  let toggleClassCheckBox3 = checkedButton3 ? "extend" : "";
  let toggleProductScenario = checkProductScenario ? "scenario" : "";

  return (
    <div className="container_slider">
      <div className="tabs">
        <input
          id="product1"
          type="radio"
          name="slider"
          onChange={handleClick1}
        />
        <input
          id="product2"
          type="radio"
          name="slider"
          onChange={handleClick2}
        />
        <input
          id="product3"
          type="radio"
          name="slider"
          onChange={handleClick3}
        />
      </div>

      <div className="buttons">
        <label htmlFor="product1" className={toggleClassCheckBox1}></label>
        <label htmlFor="product2" className={toggleClassCheckBox2}></label>
        <label htmlFor="product3" className={toggleClassCheckBox3}></label>
      </div>

      <div className="content">
        <div className={`box product1 ${toggleClassCheckBox1}`}></div>
        <div className={`box product2 ${toggleClassCheckBox2}`}></div>
        <div className={`box product3 ${toggleClassCheckBox3}`}></div>
      </div>
    </div>
  );
};

export default ProductHomePage;
