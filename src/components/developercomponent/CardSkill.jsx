import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { getAccessToken } from "../../lib/secureLocalStorage";

function CardSkill({
  img: initialImg,
  title: initialTitle,
  desc: initialDescription,
  onSave,
}) {
  const [img, setImg] = useState(initialImg);
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDescription);
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
    disabled: !isEditing,
  });

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const handleSave = async () => {
    let uploadedImageUrl = img;

    // If a new image file is selected, upload it
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
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
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    }

    const skillData = {
      title,
      description: desc || "",
      images: [uploadedImageUrl],
    };

    try {
      if (onSave) {
        onSave(skillData);
      }
    } catch (error) {
      console.error(
        "Error saving skill data: ",
        error.response?.data || error.message
      );
    }
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  return (
    <div>
      <div className="border-[3px] w-40 h-40 sm:w-52 sm:h-52  overflow-hidden flex justify-center rounded-lg flex-col items-center gap-2 dark:bg-gray-800 bg-[#F7F7F7]">
        <div
          {...getRootProps({ className: "w-24 h-24 sm:w-40 sm:h-40 relative" })}
        >
          <input {...getInputProps()} />
          <img src={img} className="w-full h-full object-cover" alt={title} />
          {isEditing && (
            <div
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
              onClick={open}
            >
              <p className="text-white">Click or Drop to change image</p>
            </div>
          )}
        </div>
        <ContentEditable
          html={title}
          disabled={!isEditing}
          onChange={handleContentChange(setTitle)}
          className="dark:text-gray-100 text-center"
          style={isEditing ? editableStyle : {}}
        />
      </div>
      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-primary text-white mt-2 p-2 rounded-md hover:bg-primary-hover"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default CardSkill;
