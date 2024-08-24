import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const ServiceSectionBusiness = ({
  sectionTitle: initialTitle,
  sectionSubtitle: initialSubtitle,
  services: initialServices,
  isDarkMode,
}) => {
  const [sectionTitle, setSectionTitle] = useState(initialTitle);
  const [sectionSubtitle, setSectionSubtitle] = useState(initialSubtitle);
  const [services, setServices] = useState(initialServices);

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

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };
    setServices(updatedServices);
  };

  return (
    <section
      className={`py-16 w-full ${
        isDarkMode ? "bg-gray-900" : "bg-[#f7f7f7]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3
            className={`text-sm font-medium mb-2 ${
              isDarkMode ? "text-orange-400" : "text-orange-400"
            }`}
          >
            {sectionSubtitle}
          </h3>
          <h2
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {sectionTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              serviceName={service.name}
              description={service.description}
              isDarkMode={isDarkMode}
              isEditing={isEditing} // Pass down the isEditing prop
              onEdit={
                isEditing
                  ? {
                      onNameChange: (newValue) =>
                        handleServiceChange(index, "name", newValue),
                      onDescriptionChange: (newValue) =>
                        handleServiceChange(index, "description", newValue),
                      onIconChange: (newFile) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleServiceChange(index, "icon", reader.result);
                        };
                        reader.readAsDataURL(newFile);
                      },
                    }
                  : null
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSectionBusiness;
