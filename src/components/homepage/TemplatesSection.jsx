import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../lib/secureLocalStorage";
import { fetchPublicTemplates } from "../../redux/feature/websitetemplate/publictemplate/publicTemplatesSlice";
import CardTemplate from "./CardTemplate"; // Adjust the import based on your file structure
import { debounce } from "lodash";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaChevronCircleRight } from "react-icons/fa";

function TemplatesSection() {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templates, status, error } = useSelector(
    (state) => state.publicTemplates
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPublicTemplates());
    }
  }, [status, dispatch]);

  const updateSlidesToShow = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 532) {
      setSlidesToShow(1);
    } else if (windowWidth < 540) {
      setSlidesToShow(1.2);
    } else if (windowWidth < 768) {
      setSlidesToShow(1.4);
    } else if (windowWidth < 800) {
      setSlidesToShow(1.5);
    } else if (windowWidth < 950) {
      setSlidesToShow(1.6);
    } else if (windowWidth < 1280) {
      setSlidesToShow(1.7);
    } else if (windowWidth < 1350) {
      setSlidesToShow(1.9);
    } else if (windowWidth < 1536) {
      setSlidesToShow(2);
    } else if (windowWidth < 1650) {
      setSlidesToShow(2.2);
    } else {
      setSlidesToShow(2.7);
    }
  };

  const handleResize = debounce(updateSlidesToShow, 100);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("resize", handleResize);
    updateSlidesToShow();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow,
    centerMode: true,
    centerPadding: "10px",
  };

  const handleCardClick = () => {
    const isLoggedIn = !!getAccessToken();
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };
  return (
    <section
      className="bg-[#F7F7F7] dark:bg-gray-800 font-sans section p-20"
      name="template"
    >
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Skeleton width={400} height={30} />
          <Skeleton width={200} height={20} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="xl:text-4xl text-primary font-semibold sm:text-2xl sm:max:px-10 sm:max:text-center">
            Transform your work into art with our templates
          </h2>
          <p className="text-lg dark:text-gray-100">Our popular templates!</p>
          <div className="w-44 rounded-md h-1 bg-primary"></div>
        </div>
      )}
      <div className="mt-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              <Skeleton className="md:w-[450px] md:h-[350px] w-[300px] h-[250px]" />
              <Skeleton className="md:w-[450px] md:h-[350px] w-[300px] h-[250px]" />
              <Skeleton className="md:w-[450px] md:h-[350px] w-[300px] h-[250px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {templates.slice(0, 3).map((template) => (
                <CardTemplate
                  key={template.id}
                  type={template.name}
                  image={template.image}
                  onClick={handleCardClick}
                />
              ))}
              {isVisible &&
                templates
                  .slice(3)
                  .map((template) => (
                    <CardTemplate
                      key={template.id}
                      type={template.name}
                      image={template.image}
                      onClick={handleCardClick}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-row justify-center items-center mt-5">
          <Skeleton width={200} height={30} />
        </div>
      ) : (
        <div className="controls">
          <motion.button
            className="p-3 gap-3 bg-primary mt-10 flex w-[200px] mx-auto justify-center items-center rounded-md text-white hover:bg-primary-hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVisible(!isVisible)}
          >
            <div>{isVisible ? "Hide" : "More Template"}</div>
            <FaChevronCircleRight />
          </motion.button>
        </div>
      )}
    </section>
  );
}

export default TemplatesSection;
