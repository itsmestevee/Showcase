import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  createBlog,
  fetchBlogs,
} from "../../redux/feature/websitetemplate/BlogSlice";
import { getAccessToken } from "../../lib/secureLocalStorage";

function CardBlog({
  img: initialImg,
  title: initialTitle,
  desc: initialDesc,
  id,
  onRemove, // Callback function to remove the card
}) {
  const [img, setImg] = useState(initialImg);
  const [file, setFile] = useState(null); // Store the file for upload
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDesc);
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );
  const dispatch = useDispatch();

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
        setImg(reader.result); // Show the image preview
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
    },
    disabled: !isEditing,
  });

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const handleSave = async () => {
    try {
      let uploadedImageUrl = img;

      // If a new image file is selected, upload it
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
        uploadedImageUrl = uploadResponse.data.url; // Adjust based on your API response
      }

      const blogData = {
        title,
        description: desc,
        images: uploadedImageUrl ? [uploadedImageUrl] : [],
      };

      const resultAction = await dispatch(createBlog(blogData));

      if (createBlog.fulfilled.match(resultAction)) {
        await dispatch(fetchBlogs());
      } else {
        console.error(
          "Failed to create blog:",
          resultAction.payload || resultAction.error
        );
      }
    } catch (error) {
      console.error("Error in saving blog:", error);
    }
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
    <div className="w-[400px] rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-100 shadow-xl group">
      <div className="overflow-hidden" {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          src={img.url || placeholderImage}
          onError={handleImageError}
          className="transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:filter group-hover:grayscale w-full"
          alt="Blog"
        />
      </div>

      <div className="flex flex-col gap-10 py-10 px-5 border-primary-developer-template border-[10px] border-b-0 border-l-0 border-r-0">
        <ContentEditable
          html={title}
          disabled={!isEditing}
          onChange={handleContentChange(setTitle)}
          className="text-2xl font-semibold"
          style={isEditing ? editableStyle : {}}
        />
        <ContentEditable
          html={desc}
          disabled={!isEditing}
          onChange={handleContentChange(setDesc)}
          className=""
          style={isEditing ? editableStyle : {}}
        />
        {isEditing && (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-primary px-5 py-2 rounded-lg text-white"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardBlog;
