import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import Navbardashboard from "./Navbardashboard";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("isDarkMode") === "true"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      AOS.refresh();
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const location = useLocation();

  useEffect(() => {
    const allowedPaths = ['/dashboard/developer', '/dashboard/business', '/dashboard/marketing', '/dashboard/photography'];
    
    if (!allowedPaths.includes(location.pathname)) {
      clearEditingState();
    }
  }, [location]);

  const clearEditingState = () => {
    localStorage.removeItem('isEditing');
  };

  return (
    <div className={`h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex h-full">
        <SidebarComponent open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
          <Navbardashboard
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            setOpen={setOpen}
          />
          <main
            className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-10"
            data-aos="fade-up"
          >
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
