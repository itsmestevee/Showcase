import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { FaLink, FaImage, FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { getAccessToken } from "../../lib/secureLocalStorage";

function CardProject({
  img: initialImg,
  title: initialTitle,
  desc: initialDesc,
  link: initialLink,
  onSave, // Callback function to save the card details
  onRemove, // Callback function to remove the card
}) {
  const [img, setImg] = useState(initialImg);
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDesc);
  const [link, setLink] = useState(initialLink);
  const [file, setFile] = useState(null);
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
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleImageChange,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
    },
    noClick: true,
    noKeyboard: true,
    disabled: !isEditing,
  });

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const handleAddLink = () => {
    const newLink = prompt("Enter the new link URL:", link || "");
    if (newLink) {
      setLink(newLink);
    }
  };

  const handleSave = async () => {
    let uploadedImageUrl = img;

    // If a new image file is selected, upload it and get the new URL
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      uploadedImageUrl = uploadResponse.data.url;
    }

    const projectData = {
      project_title: title,
      project_description: desc,
      link_to_project: link,
      project_image: uploadedImageUrl,
    };

    console.log("Project data to save:", projectData); // Debugging line

    // Call the parent's onSave function
    onSave(projectData);
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  const placeholderImage =
    "https://i.pinimg.com/originals/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg";

  const handleImageError = () => {
    setImg(placeholderImage);
  };

  return (
    <div className="relative w-[350px] h-[350px] rounded-lg overflow-hidden group">
      <a
        href={link || "#"}
        target={isEditing ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="block w-full h-full"
        onClick={(e) => isEditing && e.preventDefault()} // Prevent navigation if editing
      >
        <div
          {...getRootProps()}
          className="w-full h-full bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 absolute z-10 flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          <FaLink className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-3xl" />
          <ContentEditable
            html={title}
            disabled={!isEditing}
            onChange={handleContentChange(setTitle)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg"
            style={isEditing ? editableStyle : {}}
          />
          <ContentEditable
            html={desc}
            disabled={!isEditing}
            onChange={handleContentChange(setDesc)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center mt-2"
            style={isEditing ? editableStyle : {}}
          />
        </div>
        <img
          src={img || placeholderImage}
          onError={handleImageError}
          className="object-cover h-full w-full"
          alt="Project"
        />
      </a>

      {isEditing && (
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={open}
            className="bg-gray-700 text-white p-2 rounded-lg flex items-center space-x-1"
          >
            <FaImage />
            <span>Upload Image</span>
          </button>
          <button
            onClick={handleAddLink}
            className="bg-gray-700 text-white p-2 rounded-lg flex items-center space-x-1"
          >
            <FaPlus />
            <span>Add New Link</span>
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-primary text-white mt-2 p-2 rounded-md"
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CardProject;
