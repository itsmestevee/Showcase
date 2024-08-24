import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";

const HeroSectionBusiness = ({
  heroImage: initialHeroImage,
  name: initialName,
  bio: initialBio,
  button,
  imgAlt,
  isDarkMode,
  collectData,
}) => {
  const [heroImage, setHeroImage] = useState(initialHeroImage);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
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

  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageChange,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    disabled: !isEditing,
    onDropRejected: () => {
      alert("Please upload a valid image file.");
    },
  });

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const editableStyle = {
    border: "1px dashed red",
    padding: "2px",
  };

  // Function to collect data from this component
  const getData = () => ({
    heroImage,
    name,
    bio,
  });

  // Pass this function to the parent
  useEffect(() => {
    if (collectData) {
      collectData(getData);
    }
  }, [collectData, heroImage, name, bio]);

  return (
    <div
      className={`py-16 lg:py-24 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <ContentEditable
              html={name}
              disabled={!isEditing}
              onChange={handleContentChange(setName)}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={isEditing ? editableStyle : {}}
            />
            <ContentEditable
              html={bio}
              disabled={!isEditing}
              onChange={handleContentChange(setBio)}
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } max-w-xl`}
              style={isEditing ? editableStyle : {}}
            />
            <button className="group text-white flex items-center gap-3 px-8 py-4 bg-orange-400 rounded-md font-semibold transition duration-300 hover:bg-white hover:text-black">
              <span>{button}</span>
              <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center items-center">
            <div
              {...getRootProps({
                className: "relative w-full h-auto cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <div className="relative">
                <img
                  src={heroImage}
                  alt={imgAlt}
                  className="rounded-lg w-full h-auto object-contain"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                    <p className="text-white">Click to change image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionBusiness;
