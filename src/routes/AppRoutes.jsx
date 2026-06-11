import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/404";

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
import EnquriyDeatils from "../pages/settings/EnquriyDeatils";
import PaymentPolicy from "../pages/settings/PaymentPolicy";
import PrivacyPoplicy from "../pages/settings/PrivacyPoplicy";
import HomePageSettings from "../pages/settings/HomePageSettings";
import VehicleEnquiry from "../pages/vehicles/VehicleEnquiry";
import HotelEnquiry from "../pages/hotels/HotelEnquiry";




export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
           <Route path="/login" element={<Login />} />
           <Route path="/forget-password" element={<ForgetPassword />} />
     
           {/* Default */}
           {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
     
           {/* Protected Routes */}
           <Route element={<ProtectedRoute />}>
     
             {/* <Route path="/" element={<MainLayout />}> */}
             <Route element={<MainLayout />}>

               {/* <Route index element={<Dashboard />} /> */}
               <Route path="/dashboard" element={<Dashboard />} />
               
               <Route path="hotel/*" element={<HotelManager />} />
               <Route path="vehicle/*" element={<VehiclesManager />} />
               <Route path="blogs/*" element={<BlogManager />} />
               <Route path="tours/*" element={<TourManager />} />
     
               <Route path="tour-enquriy" element={<TourEnquiry />} />
               <Route path="vehicle-enquriy" element={<VehicleEnquiry />} />
               <Route path="hotel-enquriy" element={<HotelEnquiry />} />
     
               <Route path="enquiry-details" element={<EnquriyDeatils />} />
               <Route path="paymentpolicy" element={<PaymentPolicy />} />
               <Route path="privacypolicy" element={<PrivacyPoplicy />} />
               <Route path="home-settings" element={<HomePageSettings />} />
             </Route>
     
           </Route>
     
           {/* Invalid Route */}
           <Route path="*" element={<NotFound />} />
           {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
}