import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/Dashboard";
// import Packages from "../pages/tours/Packages";
import BlogManager from "../pages/blogs/BlogManager";
import HotelManager from "../pages/hotels/HotelManager";
import Login from "../pages/authentication/Login";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import TourManager from "../pages/tours/TourManager";
import AddTour from "../pages/tours/TourForm";
import VehiclesManager from "../pages/vehicles/VehiclesManager";
import TourEnquiry from "../pages/tours/TourEnquiry";
import GeneralSettings from "../pages/settings/GeneralSettings";
import PaymentPolicy from "../pages/settings/PaymentPolicy";
import PrivacyPoplicy from "../pages/settings/PrivacyPoplicy";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ✅ Login Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />

      {/* ✅ DEFAULT → LOGIN */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* ✅ DASHBOARD LAYOUT */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        {/* <Route path="packages" element={<Packages />} /> */}
        <Route path="hotels" element={<HotelManager />} />
        <Route path="vehicle" element={<VehiclesManager />} />
        <Route path="blog-table" element={<BlogManager />} />
        <Route path="tour-enquriy" element={<TourEnquiry />} />
        <Route path="settings" element={<GeneralSettings />} />
        <Route path="paymentpolicy" element={<PaymentPolicy />} />
        <Route path="privacypolicy" element={<PrivacyPoplicy />} />
        <Route path="tour-manager" element={<TourManager />} />
        <Route path="add-tour" element={<AddTour />} />
      </Route>

    </Routes>
  );
}