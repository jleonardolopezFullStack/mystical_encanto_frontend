import { useEffect, useState } from "react";
import * as axiosService from "../../services/axiosServices.js";
import "../styles/selectcategory.css";

const SelectProduct = ({
  stateCreationProduct = "",
  handleGetProductState,
}) => {
  const [categorys, setcategorys] = useState();

  const gettingCategoryFromService = async () => {
    const res = await axiosService.getProductsService();
    console.log(res.data.product[1]);
    setcategorys(res.data.categorys[1]);
  };
  //console.log(categorys);
  useEffect(() => {
    gettingCategoryFromService();
  }, []);

  return (
    <div className="select_category_container">
      <p>Select products:</p>
      <select
        className="select_category"
        name="category"
        value={stateCreationProduct}
        onChange={handleGetProductState}
      >
        <option></option>
        {/*         {categorys?.map((category) => {
          return <option>{category?.name}</option>;
        })} */}
        <option>mango</option>
        <option>naranha</option>
        <option>nala</option>
      </select>
    </div>
  );
};

export default SelectProduct;
