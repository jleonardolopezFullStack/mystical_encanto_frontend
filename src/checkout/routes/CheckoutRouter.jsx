import { Routes, Route, Navigate } from "react-router-dom";
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";

SuccessPage;
const CheckoutRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        {/*  <Route path="/fail" element={<Navigate to="/product/pursehome" />} /> */}
      </Routes>
    </>
  );
};

export default CheckoutRouter;
