import React from "react";
import { motion } from "framer-motion";
const CardInfo = () => {
  return (
    <a
      className="font-sans flex flex-col justify-center items-center sm:gap-10 xl:h-auto sm:h-auto sm:w-full md:w-[50%] rounded-md text-white mt-24"
      data-aos="flip-left"
      href="#input"
    >
      <motion.img
        src="/homepageImg/contact2.png"
        className="w-8/12 lg:w-[400px]"
        alt="img-contact"
        whileHover={{ scale: [null, 1.2, 1.1] }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
      />
    </a>
  );
};

export default CardInfo;
