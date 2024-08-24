import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaTelegramPlane } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { HiX } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NavBarComponent() {
  const navigate = useNavigate();

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!getAccessToken();
  });
  const [showBanner, setShowBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  const handleGetStartClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav>
      <AnimatePresence>
        {showBanner && !isScrolling && (
          <motion.div
            className="fixed top-0 w-full z-40 flex items-center justify-center md:px-20 bg-primary text-white"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex w-full justify-between items-center bg-primary py-1 px-2 lg:max-w-7xl">
              <div className="flex items-center ">
                {isLoading ? (
                  <Skeleton
                    circle={true}
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                ) : (
                  <FaTelegramPlane className="mr-2 h-5 w-5" />
                )}
                {isLoading ? (
                  <Skeleton className="sm:w-[250px] w-[100px] h-[20px]" />
                ) : (
                  <p className="text-sm font-normal">
                    <span className="sm:hidden block">
                      Join our Telegram Community!
                    </span>
                    <span className="sm:block hidden">
                      Join our Telegram Community! Stay connected and updated!
                    </span>
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center">
                {isLoading ? (
                  <Skeleton width={80} height={24} />
                ) : (
                  <button
                    onClick={() =>
                      window.open("https://t.me/showcasecommunityvip", "_blank")
                    }
                    className="px-3 py-1 bg-white text-primary hover:bg-gray-200 rounded-md text-sm"
                  >
                    Join Now
                  </button>
                )}
                <button
                  className="ml-4 bg-transparent text-white hover:text-gray-300"
                  onClick={() => setShowBanner(false)}
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`menu flex flex-wrap items-center justify-between lg:px-20 sm:px-10 sm-max:px-5 py-4 fixed ${
          showBanner && !isScrolling ? "top-9" : "top-0"
        } w-full drop-shadow-md font-sans dark:bg-gray-900 dark:text-gray-100 z-30 bg-white transition-all`}
      >
        <Link
          activeClass="active"
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="flex items-center gap-2 cursor-pointe mx-auto 1/3-sm:mx-0"
        >
          {isLoading ? (
            <Skeleton circle={true} height={30} width={30} />
          ) : (
            <img
              width="30px"
              height="30px"
              src="logoHomepage.png"
              alt="logoHomepage"
            />
          )}
          {isLoading ? (
            <Skeleton width={100} height={24} />
          ) : (
            <p className="1/2-sm:block hidden text-xl font-semibold text-gray-700 dark:text-gray-100">
              Showcase
            </p>
          )}
        </Link>
        <ul
          className={`flex-col gap-6 md:flex-row lg:flex items-center w-full lg:w-auto lg:mx-4 lg:space-x-4 lg-max:hidden`}
        >
          <li className="hover:text-primary cursor-pointer">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="dark:text-primary text-primary"
                to="template"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100 dark:hover:text-primary"
                onSetActive={() => setIsOpen(false)}
              >
                Template
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="dark:text-primary text-primary"
                to="features"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100 dark:hover:text-primary"
                onSetActive={() => setIsOpen(false)}
              >
                Features
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="dark:text-primary text-primary"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100 dark:hover:text-primary"
                onSetActive={() => setIsOpen(false)}
              >
                About
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="dark:text-primary text-primary"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100 dark:hover:text-primary"
                onSetActive={() => setIsOpen(false)}
              >
                Contact
              </Link>
            )}
          </li>
        </ul>
        <div className="flex justify-center items-center gap-1 lg:flex sm-max:hidden sm:hidden">
          <motion.button
            onClick={() => {
              toggleDarkMode();
              document.documentElement.classList.toggle("dark", !isDarkMode);
            }}
            className="px-4 py-2 cursor-pointer text-gray-900 dark:text-gray-100 md:rounded"
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            {isLoading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : isDarkMode ? (
              <FaSun className="w-7 h-7" />
            ) : (
              <MdDarkMode className="w-7 h-7" />
            )}
          </motion.button>
          {isLoggedIn ? (
            <button
              onClick={handleDashboardClick}
              className="px-6 flex justify-between items-center h-12 w-auto gap-2 bg-primary hover:bg-primary-hover text-white rounded-md"
            >
              {isLoading ? (
                <Skeleton circle={true} height={20} width={20} />
              ) : (
                <AiFillDashboard className="w-5 h-5" />
              )}
              {isLoading ? <Skeleton width={60} /> : "Dashboard"}
            </button>
          ) : (
            <>
              {isLoading ? (
                <Skeleton width={80} height={36} />
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-6 py-2 dark:text-gray-100 text-gray-900 hover:bg-primary hover:text-gray-100 md:rounded"
                >
                  Login
                </button>
              )}
              {isLoading ? (
                <Skeleton width={80} height={36} />
              ) : (
                <button
                  onClick={handleGetStartClick}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white md:rounded"
                >
                  Get Started
                </button>
              )}
            </>
          )}
        </div>

        <div className="lg:hidden flex justify-center items-center gap-4">
          <motion.button
            onClick={() => {
              toggleDarkMode();
              document.documentElement.classList.toggle("dark", !isDarkMode);
            }}
            className="px-4 py-2 cursor-pointer text-gray-900 dark:text-gray-100 md:rounded"
            whileTap={{ scale: 0.9, rotate: 90 }}
          >
            {isLoading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : isDarkMode ? (
              <FaSun className="w-7 h-7" />
            ) : (
              <MdDarkMode className="w-7 h-7" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <IoIosClose className="h-6 w-6 bg-gray-400 rounded-md" />
            ) : (
              <div className="h-9 w-20 rounded-md flex justify-center items-center bg-primary">
                <IoMenu className="h-6 w-6 text-gray-100" />
              </div>
            )}
          </motion.button>
        </div>

        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          className={`flex-col lg:flex-row items-center w-full lg:hidden lg:w-auto ${
            isOpen ? "flex" : "hidden"
          } lg:mx-4 lg:space-x-4`}
          onClick={isOpen ? toggleMenu : undefined}
        >
          <motion.li
            variants={itemVariants}
            className="hover:text-primary cursor-pointer px-3 py-2 lg:py-0"
          >
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="template"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100"
                onSetActive={() => setIsOpen(false)}
              >
                Template
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="hover:text-primary cursor-pointer px-3 py-2 lg:py-0"
          >
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100"
                onSetActive={() => setIsOpen(false)}
              >
                Features
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="hover:text-primary cursor-pointer px-3 py-2 lg:py-0"
          >
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100"
                onSetActive={() => setIsOpen(false)}
              >
                About
              </Link>
            )}
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="hover:text-primary cursor-pointer px-3 py-2 lg:py-0"
          >
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="dark:text-gray-100"
                onSetActive={() => setIsOpen(false)}
              >
                Contact
              </Link>
            )}
          </motion.li>
          {isLoggedIn ? (
            <motion.li
              variants={itemVariants}
              className="lg:hidden px-3 py-2 lg:py-0"
            >
              {isLoading ? (
                <Skeleton width={100} height={36} />
              ) : (
                <button
                  onClick={handleDashboardClick}
                  className="px-6 flex justify-between items-center h-12 w-auto gap-2 bg-primary hover:bg-primary-hover text-white rounded-md"
                >
                  <AiFillDashboard className="w-5 h-5" />
                  Dashboard
                </button>
              )}
            </motion.li>
          ) : (
            <>
              <motion.li
                variants={itemVariants}
                className="lg:hidden px-3 py-2 lg:py-0"
              >
                {isLoading ? (
                  <Skeleton width={100} height={36} />
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className=" lg:w-auto px-6 py-2 w-36 dark:text-gray-100 text-gray-900 hover:bg-primary hover:text-gray-100 hover:2xl-max:rounded-md"
                  >
                    Login
                  </button>
                )}
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="lg:hidden px-3 py-2 lg:py-0"
              >
                {isLoading ? (
                  <Skeleton width={100} height={36} />
                ) : (
                  <button
                    onClick={handleGetStartClick}
                    className="px-6 py-2 w-36 bg-primary hover:bg-primary-hover text-white 2xl-max:rounded-md"
                  >
                    Get Started
                  </button>
                )}
              </motion.li>
            </>
          )}
        </motion.ul>
      </motion.nav>
    </nav>
  );
}
