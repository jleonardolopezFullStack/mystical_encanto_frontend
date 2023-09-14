import { Routes, Route, Navigate } from "react-router-dom";
import ControlPanelPage from "../pages/ControlPanelPage";

const ControlPanelRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ControlPanelPage />} />
        <Route path="/*" element={<Navigate to="/product/pursehome" />} />
      </Routes>
    </>
  );
};

export default ControlPanelRouter;
