import { Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Login } from "../pages/login/index";
import { Home } from "../pages/home/index";
import { SomethingNew } from "../pages/new";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/something-new" element={<SomethingNew />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};