import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiTruck,
  FiHome as FiHotel,
  FiEdit,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const menuItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },

  {
    name: "Tour Packages",
    icon: <FiCompass />,
    children: [
      { name: "Tour Manager", path: "/dashboard/add-tour" },
      { name: "Tour Enquiry", path: "/dashboard/tour-enquriy" }, // keep same as route OR fix both
    ],
  },

  { name: "Vehicle", icon: <FiTruck />, path: "/dashboard/vehicle" },

  { name: "Hotel Listings", icon: <FiHotel />, path: "/dashboard/hotels" },

  { name: "Blog", icon: <FiEdit />, path: "/dashboard/blog-table" },


    {
    name: "Settings",
    icon: <FiCompass />,
    children: [
      { name: "General Settings", path: "/dashboard/settings" },
      { name: "Privacy Policy", path: "/dashboard/privacypolicy" },
      { name: "Payment Policy", path: "/dashboard/paymentpolicy" }, // keep same as route OR fix both
    ],
  },
];







const lowerMenu = [
  { name: "Logout", icon: <FiLogOut />, path: "/login" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <aside
      className={`
    sidebar-base fixed lg:fixed
    ${isOpen ? "sidebar-open" : "sidebar-close"}
    ${isOpen ? "sidebar-lg-open" : "sidebar-lg-close"}
  `}
    >
      <button
        onClick={toggleSidebar}
        className="lg:hidden m-3 p-2 bg-black text-white rounded w-fit"
      >
        <IoMdClose />
      </button>
      {/* Header */}
      <div className="editorial-container">


        {/* Hide text when closed */}
        {isOpen && (
          <div className="nav-item flex flex-col items-start gap-2">
            <h2 className="editorial-title icon-color text-xl">Nashik Kumbh</h2>
            <p className="editorial-subtitle">Meera Travels</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {

          // ✅ If item has children (Dropdown)
          if (item.children) {
            const isOpenDropdown = openDropdown === item.name;

            return (
              <div key={item.name}>

                {/* Parent */}
                <div
                  onClick={() =>
                    setOpenDropdown(isOpenDropdown ? null : item.name)
                  }
                  className={`nav-item cursor-pointer 
              ${isOpen ? "justify-between" : "justify-center"}
            `}
                >
                  <div className="flex items-center gap-2">
                    <span className="nav-icon icon-color">
                      {item.icon}
                    </span>

                    {isOpen && (
                      <span className="nav-text">{item.name}</span>
                    )}
                  </div>

                  {/* Arrow */}
                  {isOpen && (
                    <FiChevronDown
                      className={`transition-transform duration-300 ${isOpenDropdown ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </div>

                {/* Dropdown Items */}

                <div
                  className={`ml-10 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out
                          ${isOpen && isOpenDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      onClick={() => {
                        
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                      className={({ isActive }) =>
                        `block text-sm px-2 py-2 rounded 
      ${isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
                {/* {isOpen && isOpenDropdown && (
                  <div className="ml-10 mt-1 space-y-1 transition-all duration-300">
                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            toggleSidebar();
                          }
                        }}
                        className={({ isActive }) =>
                          `block text-sm px-2 py-2 rounded 
                    ${isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )} */}
              </div>
            );
          }

          // ✅ Normal menu item
          return (
            <NavLink
              key={item.name}
              to={item.path}
               end={item.path === "/dashboard"}
              onClick={() => {
                setOpenDropdown(null); // ✅ CLOSE DROPDOWN

                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={({ isActive }) =>
                `nav-item 
          ${isActive ? "nav-item-active" : "nav-item-inactive"} 
          ${isOpen ? "justify-start" : "justify-center"}`
              }
            >
              <span className="nav-icon icon-color">
                {item.icon}
              </span>

              {isOpen && <span className="nav-text">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Button */}
      {/* <div className="pt-4">
        <button className="btn-primary flex items-center gap-2 justify-center">
          <span className="text-xl"><FiPlus /></span>

          {isOpen && "New Package"}
        </button>
      </div> */}

      {/* Lower Menu */}
      {/* {lowerMenu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={() => {
            if (window.innerWidth < 1024) {
              toggleSidebar();
            }
          }}
          className={({ isActive }) =>
            `lower-nav-item ${isActive ? "lower-nav-active" : "lower-nav-inactive"
            }`
          }
        >
          <span>
            {item.icon}
          </span>

          {isOpen && <span className="text-sm">{item.name}</span>}
        </NavLink>
      ))} */}
    </aside>
  );
}