import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function ReadMoreComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { blog } = location.state;

  return (
    <section className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-end">
        <button onClick={() => navigate(-1)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <IoIosClose size={24} />
        </button>
      </div>
      <img className="w-full h-auto rounded-lg mb-4" src={blog?.image} alt={blog?.title} />
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {blog?.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        {blog?.description}
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <FaFacebook size={24} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <FaGithub size={24} />
        </a>
      </div>
    </section>
  );
}
