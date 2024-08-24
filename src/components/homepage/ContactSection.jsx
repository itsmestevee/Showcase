import React, { useEffect, useRef, useState } from "react";
import CardInfo from "./CardInfo";
import FormContact from "./FormContact";
import { motion, useAnimation, useInView } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3, once: false });
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const cardVariants = {
    initial: { y: "30%", opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
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
    <section className="w-full flex flex-col items-center justify-center px-5 dark:bg-gray-900" name="contact">
      <div className="container flex flex-col justify-center items-center gap-6 mt-10">
        {isLoading ? (
          <Skeleton width={300} height={40} />
        ) : (
          <h2 className="text-4xl text-primary font-semibold">Contact Us</h2>
        )}
        {isLoading ? (
          <Skeleton width={400} height={20} />
        ) : (
          <p className="text-lg dark:text-gray-100 text-center sm:text-start">
            Any question or remarks? Just write us a message!
          </p>
        )}
        {isLoading ? (
          <Skeleton width={100} height={10} />
        ) : (
          <div className="w-44 rounded-md h-1 bg-primary"></div>
        )}
      </div>
      <div
        className="container dark:bg-gray-900 py-10 lg:px-20 sm:px-10 sm-max:px-5 flex flex-col justify-between items-center font-sans section"
        name="contact"
      >
        <motion.div
          variants={cardVariants}
          initial="initial"
          ref={ref}
          animate={controls}
          className="container flex sm-max:flex-col md:flex-row md:p-5 rounded-md sm-max:w-[100%] sm:w-full lg:w-auto gap-10 justify-center items-center md:justify-start md:items-start"
        >
          {/* card info */}
          {isLoading ? <Skeleton circle height={300} width={300} /> : <CardInfo />}
          {/* form send message */}
          {isLoading ? <Skeleton className="md:h-[300px] md:w-[400px] w-[300px] h-[200px]"/> : <FormContact />}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
