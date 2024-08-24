// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTemplates } from "../../redux/feature/websitetemplate/TemplateSlice";
// import TemplateList from "../../redux/feature/websitetemplate/TemplateList";
// import Skeleton from "@mui/material/Skeleton";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { motion } from "framer-motion";

// function HomeDashboard() {
//   const dispatch = useDispatch();
//   const { templates, status } = useSelector((state) => state.templates);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchTemplates());
//     AOS.init({ duration: 1000 });

//     return () => {
//       AOS.refresh();
//     };
//   }, [dispatch]);

//   let content;

//   if (status === "loading") {
//     content = (
//       <Grid container spacing={2}>
//         {Array.from(new Array(4)).map((_, index) => (
//           <Grid item key={index} xs={12} sm={6} md={3}>
//             <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
//               <Skeleton variant="rectangular" width="100%" height={118} />
//               <Box sx={{ pt: 0.5 }}>
//                 <Skeleton />
//                 <Skeleton width="60%" />
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   } else if (status === "succeeded") {
//     content = (
//       <div data-aos="fade-up">
//         <TemplateList templates={templates} />
//       </div>
//     );
//   } else {
//     content = <p>No templates available</p>;
//   }

//   const [isLoading, setIsLoading] = useState(true);

//   const handleGetStartClick = () => {
//     const isLoggedIn = !!getAccessToken();
//     if (isLoggedIn) {
//       navigate("/dashboard");
//     } else {
//       navigate("/register");
//     }
//   };

//   useEffect(() => {
//     AOS.init({ duration: 1000 });

//     // Simulate a loading state
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div>
//       {
//         isLoading ?
//       (
//         <div>
//         <Skeleton height={400} className="dark:bg-gray-200"/>
//         <Skeleton width={100} height={40}/>
//         </div>
//       ):
//       (
//     <div className="flex flex-col gap-2">
//       <motion.div className="px-6 py-4 text-white rounded-lg flex flex-col-reverse lg:flex-row justify-between items-center gap-2"
//       initial={{
//         backgroundImage: 'linear-gradient(to right, #4C3DE3, #3D31B6, #71B50C)',
//       }}
//       animate={{
//         backgroundImage: [
//           'linear-gradient(to right, #4C3DE3, #8A2BE2, #71B50C)',
//           'linear-gradient(to right, #8A2BE2, #71B50C, #4C3DE3)',
//           'linear-gradient(to right, #71B50C, #4C3DE3, #8A2BE2)',
//           'linear-gradient(to right, #4C3DE3, #8A2BE2, #71B50C)', // loop back to initial color
//         ],
//       }}
//       transition={{
//         duration: 10,
//         repeat: Infinity,
//         repeatType: 'loop',
//       }}
//       >
//         <div className="w-full lg:w-1/3 xl:w-full flex flex-col xl:-mt-20">
//           <h1 className="text-3xl lg:text-5xl font-bold leading-[40px] lg:leading-[60px] ">
//             WELCOME TO SHOWCASE!
//           </h1>
//           <p className="mt-2 text-lg lg:text-xl">Build your portfolio here,</p>
//         </div>
//         <div className="w-full lg:w-auto">
//           <img
//             src="/dashboardImg/video1.gif"
//             alt="photo"
//             className="w-40 lg:w-60 mx-auto"
//           />
//         </div>
//       </motion.div>
//       <h3 className="mt-5 text-2xl font-medium" data-aos="fade-right">
//         Your Design
//       </h3>
//       <div className="mt-5 w-full">{content}</div>
//     </div>
//     )
//   }
//     </div>
//   );
// }

// export default HomeDashboard;

import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplates } from "../../redux/feature/websitetemplate/TemplateSlice";
import TemplateList from "../dashboardTemplate/TemplateList";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import PageNotFound from "../../pages/auth/PageNotFound";

function HomeDashboard() {
  const dispatch = useDispatch();
  const { templates, status } = useSelector((state) => state.templates);
  const containerRef = useRef(null);

  const handleType = (count) => {
    console.log(count);
  };

  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  useEffect(() => {
    dispatch(fetchTemplates());
    AOS.init({ duration: 1000 });

    return () => {
      AOS.refresh();
    };
  }, [dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <Grid container spacing={2}>
        {Array.from(new Array(4)).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
              <Skeleton variant="rectangular" width="100%" height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  } else if (status === "succeeded") {
    content = (
      <div data-aos="fade-up">
        <TemplateList templates={templates} />
      </div>
    );
  } else {
    content = (
      <div className="w-full flex justify-center">
        <img
          src="public\img-pagenotfound\imgnotfound.png"
          className=" flex justify-center w-[900px] "
        />
      </div>
    );
  }

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
    // Simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <Skeleton height={400} className="dark:bg-gray-200" />
          <Skeleton width={100} height={40} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <motion.div
            className="px-6 py-4 text-white rounded-lg flex flex-col-reverse lg:flex-row justify-between items-center gap-2"
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
            <div className="w-full lg:w-1/3 xl:w-full flex flex-col xl:-mt-20">
              <h1 className="text-3xl lg:text-5xl font-bold leading-[40px] lg:leading-[60px] ">
                WELCOME TO SHOWCASE!
              </h1>
              <p className="mt-2 text-lg lg:text-xl">
                <Typewriter
                  words={['Build your portfolio here!','Try for free unlimited!', 'Get portfolio without coding!']}
                  loop={5}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  onLoopDone={handleDone}
                  onType={handleType}
                />
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <img
                src="/dashboardImg/video1.gif"
                alt="photo"
                className="w-40 lg:w-60 mx-auto"
              />
            </div>
          </motion.div>
          <h3 className="mt-5 text-2xl font-medium" data-aos="fade-right">
            Your Design
          </h3>
          <div className="mt-5 w-full">{content}</div>
        </div>
      )}
    </div>
  );
}

export default HomeDashboard;
