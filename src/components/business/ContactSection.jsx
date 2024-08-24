import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { CiPhone, CiMail, CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { updateContactData } from "../../redux/feature/websitetemplate/ContactSlice";

const ContactSection = ({ contactId, isDarkMode, title, subtitle }) => {
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );
  const dispatch = useDispatch();
  const contact = useSelector((state) =>
    state.contacts.contacts.find((c) => c.id === contactId)
  );

  const handleStorageChange = () => {
    setIsEditing(localStorage.getItem("isEditing") === "true");
  };

  useEffect(() => {
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChange = (field, value) => {
    dispatch(updateContactData({ id: contactId, field, value }));
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const inputBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const inputBorderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const buttonBgColor = isDarkMode
    ? "bg-orange-500 hover:bg-orange-600"
    : "bg-black hover:bg-gray-800";

  return (
    <div
      className={`flex flex-col items-center p-6 md:p-10 ${bgColor} ${textColor}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`text-sm font-medium ${subtitleColor}`}>{subtitle}</div>
        <div className="mt-2 text-2xl font-bold">{title}</div>
      </div>
      <div className="mt-8 w-full max-w-lg">
        <div className={`text-center ${subtitleColor} mb-4`}>
          <ContentEditable
            html={contact?.description || ""}
            disabled={!isEditing}
            onChange={(e) => handleChange("description", e.target.value)}
            className="max-w-2xl text-center text-gray-600 dark:text-gray-300"
            style={isEditing ? editableStyle : {}}
          />
        </div>
        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Your name"
              className={`flex-1 px-4 py-2 border ${inputBorderColor} rounded-md ${inputBgColor} ${textColor}`}
            />
            <input
              type="email"
              placeholder="Email"
              className={`flex-1 px-4 py-2 border ${inputBorderColor} rounded-md ${inputBgColor} ${textColor}`}
            />
          </div>
          <textarea
            placeholder="Message"
            className={`w-full px-4 py-2 border ${inputBorderColor} rounded-md h-32 ${inputBgColor} ${textColor}`}
          ></textarea>
          <button
            type="submit"
            className={`w-full py-2 text-white ${buttonBgColor} rounded-md transition duration-300`}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-3xl text-start">
        <div className="flex items-start gap-2">
          <CiPhone className="text-2xl" />
          <div>
            <div className="text-lg font-semibold">Phone number</div>
            <ContentEditable
              html={contact?.phone || "N/A"}
              disabled={!isEditing}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`text-sm ${subtitleColor}`}
              style={isEditing ? editableStyle : {}}
            />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CiMail className="text-2xl" />
          <div>
            <div className="text-lg font-semibold">Email address</div>
            <ContentEditable
              html={contact?.contact_email || "N/A"}
              disabled={!isEditing}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              className={`text-sm ${subtitleColor}`}
              style={isEditing ? editableStyle : {}}
            />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CiLocationOn className="text-2xl" />
          <div>
            <div className="text-lg font-semibold">Office Location</div>
            <ContentEditable
              html={contact?.address || "N/A"}
              disabled={!isEditing}
              onChange={(e) => handleChange("address", e.target.value)}
              className={`text-sm ${subtitleColor}`}
              style={isEditing ? editableStyle : {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
