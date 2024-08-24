import React from "react";
import ContentEditable from "react-contenteditable";
import { useDropzone } from "react-dropzone";

const ServiceCard = ({ icon, serviceName, description, isDarkMode, isEditing, onEdit }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (onEdit && file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onEdit.onIconChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,
    disabled: !isEditing,
    onDropRejected: () => {
      alert("Please upload a valid image file.");
    },
  });

  const editableStyle = isEditing
    ? {
        border: "1px dashed red",
        padding: "4px",
        borderRadius: "4px",
      }
    : {};

  return (
    <div
      className={`flex flex-col space-y-4 p-6 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md`}
    >
      <div className="flex items-center space-x-4">
        <div
          {...getRootProps()}
          className="relative w-12 h-12 flex-shrink-0 cursor-pointer"
        >
          <input {...getInputProps()} />
          <img
            src={icon}
            alt={serviceName}
            className="object-contain w-full h-full"
          />
          {isEditing && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
              <p className="text-white text-xs">Change</p>
            </div>
          )}
        </div>
        <ContentEditable
          html={serviceName}
          disabled={!isEditing}
          onChange={(e) => onEdit && onEdit.onNameChange(e.target.value)}
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          style={editableStyle}
        />
      </div>
      <ContentEditable
        html={description}
        disabled={!isEditing}
        onChange={(e) => onEdit && onEdit.onDescriptionChange(e.target.value)}
        className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        style={editableStyle}
      />
      <button
        className={`self-start px-4 py-2 ${
          isDarkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-black hover:bg-gray-800"
        } text-white text-sm rounded-md transition duration-300`}
      >
        Read more
      </button>
    </div>
  );
};

export default ServiceCard;
