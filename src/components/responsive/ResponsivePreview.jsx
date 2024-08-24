import React, { useEffect, useRef, useState } from "react";
import { FaMobileAlt, FaTabletAlt, FaLaptop } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createContact,
  updateContact,
} from "../../redux/feature/websitetemplate/ContactSlice";
import { createBlog } from "../../redux/feature/websitetemplate/BlogSlice";
import { createProject } from "../../redux/feature/websitetemplate/ProjectSlice";
import AOS from "aos";
import Skeleton from "react-loading-skeleton";

const ResponsivePreview = ({ children, device, setDevice }) => {
  const containerRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  const blogs = useSelector((state) => state.blogs.blogs);
  const projects = useSelector((state) => state.projects.projects);

  const [activeDevice, setActiveDevice] = useState(device);
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  const toggleEditing = () => {
    const currentEditingState = localStorage.getItem("isEditing") === "true";
    const newEditingState = !currentEditingState;
    localStorage.setItem("isEditing", newEditingState);
    setIsEditing(newEditingState);
    window.dispatchEvent(new Event("storage")); // Dispatch storage event
  };

  const handleMouseDown = (e) => {
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 3; // scroll-fast
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const switchDevice = (newDevice) => {
    setDevice(newDevice);
    setActiveDevice(newDevice);
    // Resize the browser window based on the device
    if (newDevice === "mobile") {
      window.resizeTo(425, 932);
    } else if (newDevice === "tablet") {
      window.resizeTo(768, 1024);
    } else if (newDevice === "desktop") {
      window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }
    // Force update the component to re-render with the new device state
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  };

  const saveData = () => {
    // // Save contacts
    // contacts.forEach((contact) => {
    //   if (contact.id) {
    //     dispatch(updateContact(contact));
    //   } else {
    //     dispatch(createContact(contact));
    //   }
    // });

    // // Save blogs
    // blogs.forEach((blog) => {
    //   dispatch(createBlog(blog));
    // });

    // // Save projects
    // projects.forEach((project) => {
    //   dispatch(createProject(project));
    // });

    toast.success("Data saved successfully!");
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleGetStartClick = () => {
    const isLoggedIn = !!getAccessToken();
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-row justify-between items-center bg-white dark:bg-gray-900 p-5">
          <Skeleton height={40} width={40} />
          <div className="md:flex flex-row justify-between items-center gap-5 hidden">
            <Skeleton height={40} width={40} />
            <Skeleton height={40} width={40} />
            <Skeleton height={40} width={40} />
          </div>
          <Skeleton height={40} width={100} className="bg-primary " />
        </div>
      ) : (
        <div className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-800">
          <div className="flex bg-white dark:bg-gray-900 py-3 rounded-md px-4 justify-between gap-5 space-x-2 mb-4 w-full shadow-md">
            <button onClick={handleBackClick}>
              <IoIosArrowBack
                size={30}
                className="mr-2 text-gray-700 dark:text-gray-300"
              />
            </button>
            <div className="flex justify-center gap-2 space-x-2">
              <motion.button
                onClick={() => switchDevice("mobile")}
                className={`btn btn-primary ${
                  activeDevice === "mobile"
                    ? "bg-primary bg-opacity-30 rounded-md"
                    : ""
                } sm-max:hidden sm:hidden md:inline`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FaMobileAlt
                  size={25}
                  className="w-10 h-10 p-2 rounded-md text-gray-700 dark:text-gray-300"
                />
              </motion.button>
              <motion.button
                onClick={() => switchDevice("tablet")}
                className={`btn btn-primary ${
                  activeDevice === "tablet"
                    ? "bg-primary bg-opacity-30 rounded-md"
                    : ""
                } sm-max:hidden sm:hidden md:inline lg:inline`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FaTabletAlt
                  size={25}
                  className="w-10 h-10 p-2 rounded-md text-gray-700 dark:text-gray-300"
                />
              </motion.button>
              <motion.button
                onClick={() => switchDevice("desktop")}
                className={`btn btn-primary ${
                  activeDevice === "desktop"
                    ? "bg-primary bg-opacity-30 rounded-md"
                    : ""
                } sm-max:hidden sm:hidden md:hidden lg:inline`}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <FaLaptop
                  size={30}
                  className="w-10 h-10 p-2 rounded-md text-gray-700 dark:text-gray-300"
                />
              </motion.button>
            </div>
            <button
              onClick={isEditing ? saveData : toggleEditing}
              className="bg-primary px-10 py-3 rounded-md text-gray-100 hover:bg-primary-hover"
            >
              {/* {isEditing ? "SAVE" : "SELECT"} */}
              SHARE
            </button>
          </div>

          <div
            className={`preview-container ${device}`}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="content ">{children}</div>
            {device === "mobile" && (
              <>
                <div className="camera"></div>
                <div className="top-sensor"></div>
                <div className="power-button"></div>
                <div className="volume-buttons"></div>
                <div className="silent-switch"></div>
              </>
            )}
            {(device === "mobile" || device === "tablet") && (
              <div className="bottom-bar"></div>
            )}
          </div>

          <style>{`
        .preview-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 100%;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: width 0.5s ease;
          background: white;
        }
        .preview-container.mobile {
          width: 425px;
          height: 932px;
          border-radius: 40px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          background: #fff;
        }
        .preview-container.tablet {
          width: 1000px;
          height: 1024px;
          border-radius: 8px;
        }
        .preview-container.desktop {
          width: 100%;
          height: 100%;
        }
        .content {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        .content::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .top-sensor {
          position: absolute;
          top: 10px;
          left: calc(50% - 50px);
          width: 100px;
          height: 20px;
          background: #000;
          border-radius: 10px;
        }
        .bottom-bar {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          height: 5px;
          width: 100px;
          background: #000;
          border-radius: 5px;
        }
      `}</style>
        </div>
      )}
    </div>
  );
};

export default ResponsivePreview;
