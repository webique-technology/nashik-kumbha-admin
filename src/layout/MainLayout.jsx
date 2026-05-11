import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // ✅ NEW

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ IF LOGGED OUT → SHOW ONLY PAGE (FORM FULL SCREEN)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-3xl p-4">
          <Outlet /> {/* 👉 Only form will render */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen">

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <main
        className={`transition-all duration-300 relative ml-0 lg:ml-[15%]
        ${isOpen ? "w-full lg:w-[90%]" : "w-full"}`}
      >
        {/* 👉 PASS LOGOUT TO HEADER */}
        <Header
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />

        <Outlet />
      </main>
    </div>
  );
}