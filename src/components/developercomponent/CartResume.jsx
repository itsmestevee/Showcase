import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { createWorkExperience } from "../../redux/feature/websitetemplate/WorkExperienceSlice";

function CartResume({ id, title, subtitle, description }) {
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );
  const [localTitle, setLocalTitle] = useState(title);
  const [localSubtitle, setLocalSubtitle] = useState(subtitle);
  const [localDescription, setLocalDescription] = useState(description);

  // Adding fields that are required by the API with default empty strings
  const [hiredDate, setHiredDate] = useState("2023-01-01T00:00:00Z"); // Default to avoid format issues
  const [achievements, setAchievements] = useState("");
  const [position, setPosition] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [workAddress, setWorkAddress] = useState("");

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

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const handleSave = () => {
    // Ensure all required fields are included when dispatching the create action
    dispatch(
      createWorkExperience({
        job_title: localSubtitle,
        company_name: localTitle,
        job_description: localDescription,
        hired_date: hiredDate, // Use the correct datetime format
        achievements: achievements || "Achievements not specified",
        position: position || "Position not specified",
        responsibility: responsibility || "Responsibilities not specified",
        work_address: workAddress || "Address not specified",
      })
    );
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  return (
    <section className="relative ml-5 md:ml-10 mb-5">
      <div className="h-[20px] w-[20px] absolute top-0 bg-white dark:bg-gray-800 z-10 -left-4 md:-left-6 rounded-full border-[5px] border-primary-developer-template"></div>
      <div className="h-full w-1 bg-primary-developer-template absolute bottom-0 -left-2 md:-left-4 rounded-lg"></div>
      <div className="font-sans w-full max-w-[500px] sm:max-w-full bg-white hover:text-gray-100 hover:outline hover:bg-primary-developer-template dark:bg-gray-700 dark:hover:bg-primary-developer-template hover:outline-1 hover:outline-gray-200 p-4 md:p-7 gap-4 md:gap-6 flex flex-col justify-start items-start rounded-lg relative">
        <div className="text-lg md:text-xl font-medium dark:text-gray-100">
          <ContentEditable
            html={localTitle}
            disabled={!isEditing}
            onChange={handleContentChange(setLocalTitle)}
            style={isEditing ? editableStyle : {}}
          />
        </div>
        <div className="text-sm md:text-base dark:text-gray-100">
          <ContentEditable
            html={localSubtitle}
            disabled={!isEditing}
            onChange={handleContentChange(setLocalSubtitle)}
            style={isEditing ? editableStyle : {}}
          />
        </div>
        <div className="text-xs md:text-sm dark:text-gray-300">
          <ContentEditable
            html={localDescription}
            disabled={!isEditing}
            onChange={handleContentChange(setLocalDescription)}
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
    </section>
  );
}

export default CartResume;
