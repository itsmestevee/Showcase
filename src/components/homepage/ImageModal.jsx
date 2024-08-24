import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from "react-icons/fa";

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-opacity-70 p-4 rounded-lg w-full h-full max-w-screen max-h-screen flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={imageSrc}
          alt="modal"
          className="w-auto h-auto max-w-full max-h-full object-contain rounded-md"
        />
        <button
        className="fixed sm:top-4 top-[30%] right-4 text-gray-900 bg-white hover:bg-primary hover:text-white shadow-sm shadow shadow-gray-200 hover:shadow-primary p-2 md:p-4 rounded-full text-lg font-bold z-60"
        onClick={onClose}
      >
        <FaTimes />
      </button>
      </motion.div>
      
    </div>
  );
};

export default ImageModal;
