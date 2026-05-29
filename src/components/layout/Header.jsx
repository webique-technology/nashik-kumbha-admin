import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";

const Header = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();


  const pageTitles = {
    "/": "Dashboard",
    "/dashboard/add-tour": "Tour Manager",
    "/dashboard/tour-enquriy": "Tour Enquiry",
    "/dashboard/vehicle": "Vehicles Manager",
    "/dashboard/hotels": "Hotel Manager",
    "/dashboard/blog-table": "Blog Manager",
    "/dashboard/settings": "Settingsqqq",

    "/dashboard/home-page-settings": "Home Page Settings",
    "/dashboard/paymentpolicy": "Payment Policy",
    "/dashboard/privacypolicy": "Privacy Policy",
    "/dashboard/settings": "Settings",
  };

  const lowerMenu = [
    { name: "Logout", icon: <FiLogOut />, path: "/login" },
  ];


  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  // 👉 Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API
      await api.post("/admin/logout");

      // Remove token/local storage
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      // Redirect to login
      navigate("/login");

    } catch (error) {
      console.error("Logout Error:", error);

      // Optional force logout
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      navigate("/login");
    }
  };


  return (
    <header className="app-header top-0 left-0 w-full">
      <div className="header-left">
        <button onClick={toggleSidebar} className="responsive-toggle">
          {isOpen ? "✕" : "☰"}
        </button>

        <h1 className="header-title text-on-surface-variant">
          {currentTitle}
        </h1>
      </div>

      <div className="header-right">
        <div className="relative" ref={dropdownRef}>

          {/* Profile */}
          <div
            className="profile-photo cursor-pointer"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8N1F22O7vLB2tzLl3PewGClnWFhJATuSUOqpuYUz34jW1GzPOgqvdYVbABHPnC-V9a_QAn7quUWJ7KIHBqRGreaZs-ot_fcwtJGH774hsWYmmc3NPAbdL5sOLL8rso62b5xFrrKwc7Sksb4pgKbYTrzX0QkMkm9g9Qjk3f1mmfFi4OZhGZTjPxRV4Qc38ZVxnoob0xxEsNo9tSBEJympKxP7aDlLzEPk-WRGabMLa7-E-YpKxrP27uslPnPV79bk0whadyYM7yhI"
              alt="User profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl z-40 transform transition-all duration-200 origin-top
              ${openDropdown
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
              }`}
          >
            {/* Arrow */}
            {/* <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 shadow-md z-10"></div> */}

            {/* <Link
              to="/notifications"
              onClick={() => setOpenDropdown(false)}
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Notifications
            </Link> */}

            {lowerMenu.map((item) => (
              <button
                key={item.name}
                onClick={handleLogout}
                className="lower-nav-item lower-nav-inactive w-full text-left"
              >
                <span className="nav-icon icon-color">
                  {item.icon}
                </span>

                {isOpen && <span className="text-sm">{item.name}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;