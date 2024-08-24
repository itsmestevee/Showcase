// "use client";

// import { Avatar, Blockquote, Rating } from "flowbite-react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export function RatingComponents({ isLoading }) {
//   return (
//     <figure className="max-w-screen-md mx-auto" data-aos="zoom-in-down">
//       <div className="mb-4 flex items-center justify-center">
//         {isLoading ? (
//           <Skeleton width={100} height={20} />
//         ) : (
//           <Rating size="md">
//             <Rating.Star />
//             <Rating.Star />
//             <Rating.Star />
//             <Rating.Star />
//             <Rating.Star />
//           </Rating>
//         )}
//       </div>
//       {isLoading ? (
//         <Skeleton count={3} />
//       ) : (
//         <Blockquote>
//           <p className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
//             "Showcase has received outstanding ratings from countless users. It
//             offers an extensive array of pre-designed templates, ranging from
//             login screens to intricate dashboards. This makes it the perfect
//             choice for anyone looking to create a professional portfolio
//             application effortlessly."
//           </p>
//         </Blockquote>
//       )}
//       <figcaption className="mt-6 flex items-center justify-center space-x-3">
//         {isLoading ? (
//           <Skeleton circle={true} height={40} width={40} />
//         ) : (
//           <Avatar
//             rounded
//             size="xs"
//             img="homepageImg/udom.png"
//             alt="profile picture"
//           />
//         )}
//         <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
//           {isLoading ? (
//             <Skeleton width={100} />
//           ) : (
//             <cite className="pr-3 font-medium text-gray-900 dark:text-white">
//               Bonnie Green
//             </cite>
//           )}
//           {isLoading ? (
//             <Skeleton width={100} />
//           ) : (
//             <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
//               Leader Our Team
//             </cite>
//           )}
//         </div>
//       </figcaption>
//     </figure>
//   );
// }
