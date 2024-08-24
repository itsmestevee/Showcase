import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { debounce } from "lodash";
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-loading-skeleton/dist/skeleton.css'; 
import { motion } from "framer-motion";

const slideSettings = [
  { width: 540, slides: 1.6 },
  { width: 640, slides: 1.8 },
  { width: 768, slides: 2 },
  { width: 868, slides: 2.3 },
  { width: 968, slides: 2.6 },
  { width: 1068, slides: 2.9 },
  { width: 1168, slides: 3.2 },
  { width: 1268, slides: 3.5 },
  { width: 1368, slides: 3.8 },
  { width: 1468, slides: 4.1 },
  { width: 1568, slides: 4.4 },
  { width: 1609, slides: 5 },
  { width: Infinity, slides: 6 },
];

function FeatureComponent({type, title, image, desc}) {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const handleResize = debounce(() => {
    const windowWidth = window.innerWidth;
    const { slides } = slideSettings.find(setting => windowWidth < setting.width);
    setSlidesToShow(slides);
  }, 100);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col md:flex-row justify-center gap-5 p-4'>
      {isLoading ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
            <Skeleton circle height={256} width={256} />
            <div className="flex flex-col justify-center items-center md:items-start">
              <Skeleton width={200} height={20}/>
              <Skeleton className="w-[200px] h-[40px] md:w-[400px] mx-auto md:mx-0"/>
              <Skeleton className="w-[300px] md:w-[600px] h-[32px]"/>
              <Skeleton className="w-[300px] md:w-[600px] h-[32px]"/>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='w-[50%] md:w-[25%] xl:w-[20%] mx-auto md:mx-0' data-aos="flip-right">
            <motion.img src={image} alt="" className='w-full ml-auto'
            whileHover={{ scale: [null, 1.2, 1.1] }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            />
          </div>
          <div className='w-full md:w-[50%] flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-3 justify-center items-center md:items-start'>
              <div>
                <small className='rounded-full bg-blue-100 text-primary p-1 w-cover'>{type}</small>
              </div>
              <h2 className='sm:text-2xl sm-max:text-2xl xl:text-4xl text-primary font-semibold'>{title}</h2>
              <p className='text-black dark:text-white text-center md:text-start'>{desc}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ReverseFeatureComponent({type, title, image, desc}) {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const handleResize = debounce(() => {
    const windowWidth = window.innerWidth;
    const { slides } = slideSettings.find(setting => windowWidth < setting.width);
    setSlidesToShow(slides);
  }, 100);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col md:flex-row-reverse justify-center gap-5 p-4 '>
      {isLoading ? (
        <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10">
          <Skeleton circle height={256} width={256} />
          <div className="flex flex-col justify-center items-center md:items-start">
            <Skeleton width={200} height={20}/>
            <Skeleton className="w-[200px] h-[40px] md:w-[400px] mx-auto md:mx-0"/>
            <Skeleton className="w-[300px] md:w-[600px] h-[32px]"/>
            <Skeleton className="w-[300px] md:w-[600px] h-[32px]"/>
          </div>
        </div>
      </div>
      ) : (
        <>
          <div className='w-[50%] md:w-[25%] xl:w-[20%] mx-auto md:mx-0' data-aos="flip-right">
            <motion.img src={image} alt="" className='w-full ml-auto'
            whileHover={{ scale: [null, 1.2, 1.1] }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
            />
          </div>
          <div className='w-full md:w-[50%] flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-3 justify-center items-center md:items-start'>
              <div>
                <small className='rounded-full bg-blue-100 text-primary p-1 w-cover'>{type}</small>
              </div>
              <h2 className='sm:text-2xl sm-max:text-2xl xl:text-4xl text-primary font-semibold'>{title}</h2>
              <p className='text-black dark:text-white text-center md:text-start'>{desc}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FeatureComponent;
