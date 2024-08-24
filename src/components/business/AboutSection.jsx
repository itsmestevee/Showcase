import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const AboutSection = ({
  img,
  icon1,
  icon2,
  title,
  subtitle,
  description1,
  description2,
  description3,
  buttonText,
  isDarkMode
}) => {
  const [image, setImage] = useState(img);
  const [desc1, setDesc1] = useState(description1);
  const [desc2, setDesc2] = useState(description2);
  const [desc3, setDesc3] = useState(description3);
  
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsEditing(localStorage.getItem("isEditing") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
    },
    disabled: !isEditing,
  });

  const editableStyle = isEditing
    ? { border: "1px dashed red", padding: "2px" }
    : {};

  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const paragraphColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const buttonColor = isDarkMode ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-400 hover:bg-orange-500";
  const dividerColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <motion.section
      className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <p className="text-base font-medium text-orange-400 mb-2">
          {subtitle}
        </p>
        <h2 className={`text-3xl sm:text-4xl font-bold ${textColor}`}>
          {title}
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          <ContentEditable
            html={desc1}
            disabled={!isEditing}
            onChange={(e) => setDesc1(e.target.value)}
            className={`text-base ${paragraphColor}`}
            style={editableStyle}
          />
          <div className="flex items-start gap-5 py-5">
            <div
              {...getRootProps()}
              className="relative w-12 h-12 flex-shrink-0 cursor-pointer"
            >
              <input {...getInputProps()} />
              <img
                src={icon1}
                alt="Feature Icon 1"
                className="object-contain w-full h-full"
              />
              {isEditing && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-xs">Change</p>
                </div>
              )}
            </div>
            <ContentEditable
              html={desc2}
              disabled={!isEditing}
              onChange={(e) => setDesc2(e.target.value)}
              className={paragraphColor}
              style={editableStyle}
            />
          </div>
          <hr className={`border-t ${dividerColor}`} />
          <div className="flex items-start gap-5 py-5">
            <div
              {...getRootProps()}
              className="relative w-12 h-12 flex-shrink-0 cursor-pointer"
            >
              <input {...getInputProps()} />
              <img
                src={icon2}
                alt="Feature Icon 2"
                className="object-contain w-full h-full"
              />
              {isEditing && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                  <p className="text-white text-xs">Change</p>
                </div>
              )}
            </div>
            <ContentEditable
              html={desc3}
              disabled={!isEditing}
              onChange={(e) => setDesc3(e.target.value)}
              className={paragraphColor}
              style={editableStyle}
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <motion.button
              className={`flex items-center gap-2.5 px-6 py-3 font-semibold text-white ${buttonColor} rounded-md transition duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={true}
            >
              <span>{buttonText}</span>
              <FaArrowRightLong />
            </motion.button>
          </div>
        </div>
        <div
          {...getRootProps()}
          className="relative lg:w-1/3 cursor-pointer"
        >
          <input {...getInputProps()} />
          <motion.img
            src={image}
            alt="Company Image"
            className="w-full h-[500px] object-cover rounded-md bg-purple-300"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {isEditing && (
            <motion.div
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white text-lg">Change Image</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
