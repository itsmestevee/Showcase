import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../lib/secureLocalStorage";
import AOS from "aos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

function HeroSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
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

    // Simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="dark:bg-gray-900 p-10">
    <section className="sm:mt-32 mx-2 sm:mx-10 mt-32 mb-10 sm:mb-0 3xl:w-[2026px] 3xl:mx-auto" name="hero">
      <div className="flex flex-col-reverse items-start items-center md:flex-row lg:w-full xl:w-[80%] mx-auto gap-5 md:gap-0">
        <div ref={ref} className="flex flex-col sm:gap-10 gap-5 w-full md:w-1/2 items-start justify-center">
          {isLoading ? (
            <Skeleton className="w-[300px] h-[30px] lg:w-[500px] lg:h-[60px] mx-auto lg:mx-0"/>
          ) : (
            <motion.h1
              className="text-transparent bg-clip-text font-bold text-6xl sm:text-[25px] sm-max:text-[25px] md:text-[40px] lg:text-4xl xl:text-6xl"
              data-aos="zoom-in-left"
              initial={{
                backgroundImage: 'linear-gradient(to right, #4C3DE3, #3D31B6, #71B50C)',
              }}
              animate={{
                backgroundImage: [
                  'linear-gradient(to right, #4C3DE3, #8A2BE2, #71B50C)',
                  'linear-gradient(to right, #8A2BE2, #71B50C, #4C3DE3)',
                  'linear-gradient(to right, #71B50C, #4C3DE3, #8A2BE2)',
                  'linear-gradient(to right, #4C3DE3, #8A2BE2, #71B50C)', // loop back to initial color
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              Almost Portfolios For You!
            </motion.h1>
          )}

          <div className="text-xl font-medium dark:text-gray-100 xl-max:text-lg" data-aos="zoom-in-left">
            {isLoading ? (
              <div className="w-[300px] lg:w-[500px]">
                <Skeleton height={10} className="w-[100%]"/>
                <Skeleton height={10} className="w-[100%]"/>
                <Skeleton height={10} className="w-[100%]"/>
              </div>
            ) : (
              "A portfolio is a curated collection of materials that showcase your skills, accomplishments, and experience. This is a platform to you make templates for free. For more information please check below."
            )}
          </div>

          <button
            onClick={handleGetStartClick}
            className="px-6 py-3 w-44 bg-primary hover:bg-primary-hover text-white rounded-md"
            data-aos="zoom-in-left"
          >
            {isLoading ? <Skeleton width={80} /> : "Get Started"}
          </button>

          <div className="flex flex-col gap-3">
            {isLoading ? (
              <div className="w-[300px] lg:w-[500px]">
              <Skeleton height={10} className="w-[100%]"/>
              <Skeleton height={10} className="w-[100%]"/>
            </div>
            ) : (
              <>
                <div className="flex gap-3" >
                  <FaCheckCircle className="w-6 h-6 text-primary xl-max:w-4 xl-max:h-4" />
                  <p className="dark:text-gray-100 xl-max:text-[14px]">
                    Build and edit your website without any coding or technical skills
                  </p>
                </div>
                <div className="flex gap-3" >
                  <FaCheckCircle className="w-6 h-6 text-primary xl-max:w-4 xl-max:h-4" />
                  <p className="dark:text-gray-100 xl-max:text-[14px]">
                    Leverage custom modules to deliver a great user experience
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div ref={ref} className="sm:w-6/12 flex items-center justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8"

          >
            {isLoading ? (
              <Skeleton className="lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]  "/>
            ) : (
              <motion.img
                src="/homepageImg/7744153.png"
                alt="hero image"
                className="w-full h-auto"
                data-aos="zoom-in-right"
                animate={{
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default HeroSection;
