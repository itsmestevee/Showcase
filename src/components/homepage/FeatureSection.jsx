import React, { useEffect, useRef, useState } from "react";
import CardFeature from "./CardFeature";
import { FiGlobe } from "react-icons/fi";
import { GrTemplate } from "react-icons/gr";
import { FaMobileAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { FaSearchengin } from "react-icons/fa6";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { motion, useAnimation, useInView } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FeatureComponent, { ReverseFeatureComponent } from "./FeatureComponent";


function FeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: false }); // Adjusted threshold to 0.3
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const cardVariants = {
    initial: { y: "30%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  };


  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else {
      controls.start("initial"); // Reset animation when out of view
    }
  }, [isInView, controls]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <section
      className="xl:py-20 sm:py-10 sm-max:py-10 font-sans section dark:bg-gray-900 sm:px-10 lg:px-40"
      name="features"
    >
      <div className="flex flex-col justify-center items-center gap-6 sm-max:px-5">
        {isLoading ? (
          <Skeleton width={300} height={40} />
        ) : (
          <h2 className="sm:text-2xl sm-max:text-2xl xl:text-4xl text-primary font-semibold text-center md:text-start">
            Why Choose Showcase?
          </h2>
        )}
        {isLoading ? (
          <Skeleton width={400} height={20} />
        ) : (
          <p className="sm:text-[16px] sm-max:text-[16px] sm-max:text-center xl:text-lg dark:text-gray-100">
            Showcase.com has everything you need. Whatever you want to do, we
            have a feature for it.
          </p>
        )}
        {isLoading ? (
          <Skeleton width={100} height={10} />
        ) : (
          <div className="w-44 rounded-md h-1 bg-primary"></div>
        )}
      </div>
      <div className="3xl:w-[2026px] 3xl:mx-auto">
      <FeatureComponent
      type="public domain name"
      title ="Public Domain Name"
      image ="/homepageImg/domaim.png"
      desc ="
      Claim your unique public domain name to make your portfolio easily accessible to everyone online.
      "
      />
      <ReverseFeatureComponent
      type="free tempates"
      title ="Free Template"
      image ="/homepageImg/free.png"
      desc ="
      Choose from a variety of professionally designed templates available for free, tailored to various professions.
      "
      />
      <FeatureComponent
      type="responsive template"
      title ="Responsive Templates"
      image ="/homepageImg/responsive.png"
      desc ="
      All our templates are fully responsive, ensuring your portfolio looks great on any device.
      "
      />
      <ReverseFeatureComponent
      type="easy customization"
      title ="Easy Customization"
      image ="/homepageImg/customize.png"
      desc ="
      Easily customize your portfolio with our intuitive tools. Update text, images, and social media links to make it uniquely yours.
      "
      />
      <FeatureComponent
      type="seo friendly"
      title ="SEO-Friendly"
      image ="/homepageImg/seo.png"
      desc ="
      Every template is optimized for search engines out of the box, helping you attract more visitors without any extra effort.
      "
      />
      <ReverseFeatureComponent
      type="secure and reliable"
      title ="Secure and Reliable"
      image ="/homepageImg/secure.png"
      desc ="
      Your data is secure with us. We ensure top-notch security and reliability, so you can focus on creating without worries.
      "
      />
      </div>
    </section>
  );
}

export default FeatureSection;
