import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const FooterSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-[#F7F7F7] dark:bg-gray-800 dark:text-gray-100 py-6 flex flex-col items-center font-sans">
      <section className="flex flex-col sm:flex-row sm:justify-between xl:justify-evenly items-start w-full xl:px-20 sm:px-10 px-5 pb-3 border-b-4">
        {/* logo */}
        <Link
          activeClass="active"
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="flex flex-row items-center gap-2 cursor-pointer mb-4 sm:mb-0 mx-auto sm:mx-0"
        >
          {loading ? (
            <Skeleton circle={true} height={60} width={60} />
          ) : (
            <motion.img
              className="sm:w-[60px] sm:h-[60px] w-[30px] h-[30px]"
              src="logoHomepage.png"
              alt="logoHomepage"
              whileHover={{ scale: 1.2}}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
            />
          )}
          {loading ? (
            <Skeleton circle={true} height={60} width={60} />
          ) : (
            <motion.img
              className="sm:w-[70px] sm:h-[70px] w-[35px] h-[35px]"
              src="/homepageImg/cstad-removebg-preview.png"
              alt="logoHomepage"
              whileHover={{ scale: 1.2}}
              whileTap={{
                scale: 0.8,
                borderRadius: "100%"
              }}
            />
          )}
        </Link>

        {/* card info */}
        <div className="flex flex-col justify-start gap-2 items-start mb-4 sm:mb-0 mx-auto sm:mx-0">
          <p className="font-semibold text-center mx-auto sm:mx-0">
            {loading ? <Skeleton width={100} /> : "Contact Us"}
          </p>
          <div className="flex justify-start items-center gap-2 sm:gap-4">
            {loading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : (
              <MdWifiCalling3 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            )}
            {loading ? <Skeleton width={150} /> : <p>+855 95 990 910</p>}
          </div>
          <div className="flex justify-start items-center gap-2 sm:gap-4">
            {loading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : (
              <FaLocationDot className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            )}
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <p>St 562, Phnom Penh 12151</p>
            )}
          </div>
        </div>

        {/* FAQs */}
        <div className="flex flex-col justify-start gap-2 items-start mb-4 sm:mb-0 mx-auto sm:mx-0">
          <p className="font-semibold">
            {loading ? <Skeleton width={100} /> : "FAQS"}
          </p>
          <div className="flex justify-start items-center gap-2 sm:gap-4 hover:text-primary">
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <a href="register">Sign Up</a>
            )}
          </div>
          <div className="flex justify-start items-center gap-2 sm:gap-4 hover:text-primary">
            {loading ? <Skeleton width={150} /> : <a href="login">Log In</a>}
          </div>
        </div>

        {/* Explore */}
        <ul className="flex flex-col justify-start gap-2 items-start mx-auto sm:mx-0">
          <p className="font-semibold">
            {loading ? <Skeleton width={100} /> : "Explore"}
          </p>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="template"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Template
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Features
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                About
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Contact
              </Link>
            )}
          </li>
        </ul>
      </section>

      {/* copyright */}
      <p className="pt-4 pb-2 text-center">
        &copy;{" "}
        {loading ? (
          <Skeleton width={50} />
        ) : (
          `Copyright - ${new Date().getFullYear()}`
        )}
        <span className="text-primary font-medium"> Showcase</span>
      </p>
    </footer>
  );
};

export default FooterSection;
