import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

function CardTemplate({ type, image }) {
  return (
    <a className="font-sans"  data-aos="flip-right" href="./dashboard">
      <div className="w-full 2xl:w-[450px] lg:h-[350px] bg-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-all rounded-md h-auto p-2 sm:p-4 flex flex-col justify-between gap-3 group dark:bg-gray-900">
        <div className="w-full h-full rounded-md h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
          <motion.img
            src={image}
            className="rounded-md object-cover w-full h-full sm:h-[250px]"
            alt={type}
            whileHover={{scale: 1.05}}
          />
        </div>
        <div className="flex justify-between bg-white py-3 rounded-md items-center px-4 dark:bg-gray-700 dark:text-gray-100">
          <div className="relative h-8 w-auto overflow-hidden">
            <p className="text-xl sm:text-xl font-medium group-hover:translate-y-[-100%] transform transition-transform duration-300 ease-in-out">
              {type}
            </p>
            <p className="absolute bottom-0 text-xl sm:text-xl font-medium group-hover:translate-y-[-20%] transform translate-y-14 transition-transform duration-300 ease-in-out">
              {type}
            </p>
          </div>
          <FaArrowRightLong className="w-6 h-6 sm:w-7 sm:h-7 transform transition-transform duration-300 ease-in-out group-hover:-rotate-45" />
        </div>
      </div>
    </a>
  );
}

export default CardTemplate;
