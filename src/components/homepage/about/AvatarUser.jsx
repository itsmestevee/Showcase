"use client";

import { Avatar } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AvatarUser({ isLoading }) {
  return (
    <div
      className="flex flex-col items-center space-y-6"
      data-aos="zoom-in-down"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold  dark:text-gray-100">Our Team</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Meet the awesome people behind our success.
        </p>
      </div>

      {isLoading ? (
        <div className="flex space-x-4">
          <Skeleton circle={true} height={40} width={40} count={5} />
        </div>
      ) : (
        <Avatar.Group className="space-x-4">
          <Avatar img="homepageImg/raksmey.png" rounded stacked />
          <Avatar img="homepageImg/norin.png" rounded stacked />
          <Avatar img="homepageImg/tey.png" rounded stacked />
          <Avatar img="homepageImg/rotha.png" rounded stacked />
          <Avatar img="homepageImg/nary.png" rounded stacked />
        </Avatar.Group>
      )}

      {isLoading ? (
        <div className="flex space-x-4">
          <Skeleton circle={true} height={40} width={40} count={5} />
        </div>
      ) : (
        <Avatar.Group className="space-x-4">
          <Avatar img="homepageImg/panha.png" rounded stacked />
          <Avatar img="homepageImg/bunsinh.png" rounded stacked />
          <Avatar img="homepageImg/chhoeurn.png" rounded stacked />

          <Avatar.Counter total={99} href="#" />
        </Avatar.Group>
      )}
    </div>
  );
}
