import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import ProductRoutes from "../products/routes/ProductRouter";
import ControlPanelRouter from "../control_panel/routes/ControlPanelRoutes";
import CheckoutRouter from "../checkout/routes/CheckoutRouter";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/product/*" element={<ProductRoutes />} />
        <Route path="/controlpanel/*" element={<ControlPanelRouter />} />
        <Route path="/checkout/*" element={<CheckoutRouter />} />
      </Routes>
    </>
  );
};

export default AppRouter;
