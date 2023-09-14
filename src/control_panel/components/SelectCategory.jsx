import { useEffect, useState } from "react";
import * as axiosService from "../../services/axiosServices.js";
import "../styles/selectcategory.css";

const SelectCategory = ({ selectingCategory = "", handleGetProductState }) => {
  const [categorys, setcategorys] = useState();
  const gettingCategoryFromService = async () => {
    const res = await axiosService.getCategorysService();
    //console.log(res.data.categorys[1]);
    setcategorys(res.data.categorys[1]);
  };
  //console.log(categorys);
  useEffect(() => {
    gettingCategoryFromService();
  }, []);

  return (
    <div className="select_category_container">
      <p>Select one Category:</p>
      <select
        className="select_category"
        name="category"
        value={selectingCategory}
        onChange={handleGetProductState}
        key={Math.random()}
      >
        <option></option>
        {categorys?.map((category) => {
          return <option key={Math.random()}>{category?.name}</option>;
        })}
        {/*       <option>mango</option>
      <option>naranha</option>
      <option>nala</option> */}
      </select>
    </div>
  );
};

export default SelectCategory;
