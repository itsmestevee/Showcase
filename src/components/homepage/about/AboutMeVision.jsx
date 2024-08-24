// "use client";

// import { Avatar, Blockquote } from "flowbite-react";
// import { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export function AboutMeVision() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // // Simulate a loading delay
//     // setTimeout(() => {
//     //   setIsLoading(false);
//     // }, 2000); // 2 seconds delay
//   }, []);

//   return (
//     <figure
//       className="mx-auto max-w-screen-md text-right "
//       data-aos="flip-left"
//     >
//       {isLoading ? (
//         <Skeleton
//           className="mx-auto mb-3 h-10 w-10"
//           height={40}
//           width={40}
//           circle={true}
//         />
//       ) : (
//         <svg
//           className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="currentColor"
//           viewBox="0 0 18 14"
//         >
//           <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
//         </svg>
//       )}
//       <Blockquote>
//         {isLoading ? (
//           <Skeleton
//             count={2}
//             className="text-2xl font-medium italic text-gray-900 dark:text-white"
//           />
//         ) : (
//           <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
//             "Showcase is just awesome. It contains tons of predesigned templates
//             of portfolios starting from login screen to complex dashboard.
//             Perfect choice for your portfolio application."
//           </p>
//         )}
//       </Blockquote>
//       <figcaption className="mt-6 flex items-center justify-center space-x-3">
//         {isLoading ? (
//           <Skeleton circle={true} height={40} width={40} />
//         ) : (
//           <Avatar
//             rounded
//             size="xs"
//             img="homepageImg/panha.png"
//             className="object-cover"
//             alt="profile picture"
//           />
//         )}
//         <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
//           {isLoading ? (
//             <Skeleton width={100} />
//           ) : (
//             <cite className="pr-3 font-medium text-gray-900 dark:text-white">
//               Sem Sopanha
//             </cite>
//           )}
//           {isLoading ? (
//             <Skeleton width={100} />
//           ) : (
//             <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
//               Student of CSTAD
//             </cite>
//           )}
//         </div>
//       </figcaption>
//     </figure>
//   );
// }
