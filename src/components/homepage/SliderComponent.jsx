import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "aos/dist/aos.css";
import AOS from "aos";

function SliderComponent() {
  const items = [
    {
      imgSrc: '/homepageImg/cstad-removebg-preview.png',
      alt: 'CSTAD Logo',
      caption: 'CSTAD',
    },
    {
      imgSrc: '/homepageImg/ptc.png',
      alt: 'MOPAT Logo',
      caption: 'MOPAT',
    },
    {
      imgSrc: 'https://imgs.search.brave.com/2tLOaXfzpOFGvZFlJV7wnaiuKXMReayFH4NB_Yr83lI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d29ybGR2ZWN0b3Js/b2dvLmNvbS9sb2dv/cy9mcmVlcGlrLnN2/Zw',
      alt: 'FREEPIK Logo',
      caption: 'FREEPIK',
    },
    {
      imgSrc: 'https://imgs.search.brave.com/MwQnPAbW12wotTnSZM9IdCLTU9UOw8BWwdXHt_YElWM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvc29jaWFsLWlj/b25zLTMzLzEyOC9H/aXRodWItNTEyLnBu/Zw',
      alt: 'GITHUB Logo',
      caption: 'GITHUB',
    },
    {
      imgSrc: 'https://imgs.search.brave.com/G_l2TPBtXMARgbLnxsmEPByyDDRn2v1iRrXuGGI2Y7Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/Lzc0L0NhbnZhX2xv/Z28ucG5n',
      alt: 'CANVA Logo',
      caption: 'CANVA',
    },
  ];

  const figureWidth = 250;
  const figuresCount = items.length;
  const totalWidth = figureWidth * figuresCount * 0.5;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="dark:bg-gray-900">
      <div className="grid items-center relative mx-auto w-full max-w-[75%] overflow-hidden sm:p-10 p-5 3xl:w-[2026px] 3xl:mx-auto">
        {isLoading ? (
          <motion.div
            className="flex w-[calc(250px_*_18)] gap-10"
            initial={{ x: 0 }}
            animate={{ x: [0, -totalWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
              },
            }}
          >
            {items.map((_, index) => (
              <figure
                key={index}
                className="flex flex-col sm:flex-row justify-center items-center gap-2"
              >
                <Skeleton circle className="w-[70px] h-[70px]" />
                <Skeleton className="w-[150px] h-[30px]" />
              </figure>
            ))}
            {items.map((_, index) => (
              <figure
                key={index + figuresCount}
                className="flex flex-col sm:flex-row justify-center items-center gap-2"
              >
                <Skeleton circle className="w-[70px] h-[70px]" />
                <Skeleton className="w-[150px] h-[30px]" />
              </figure>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex sm:w-[calc(250px_*_18)] w-[calc(250px_*_18)] gap-10"
            initial={{ x: 0 }}
            animate={{ x: [0, -totalWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
              },
            }}
            whileHover={{ x: 0 }}
          >
            {items.map((item, index) => (
              <figure
                key={index}
                className="flex flex-col sm:flex-row justify-center items-center gap-2"
              >
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="w-[30px] h-[30px] sm:w-[70px] sm:h-[70px]"
                />
                <figcaption className="text-lg sm:text-4xl flex flex-col sm:items-center sm:justify-center font-bold text-primary">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
            {items.map((item, index) => (
              <figure
                key={index + figuresCount}
                className="flex flex-col sm:flex-row justify-center items-center gap-2"
              >
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="w-[30px] h-[30px] sm:w-[70px] sm:h-[70px]"
                />
                <figcaption className="text-lg sm:text-4xl flex flex-col sm:items-center sm:justify-center font-bold text-primary">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SliderComponent;
