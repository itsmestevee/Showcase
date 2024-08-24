import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  fetchTemplateData,
  selectTemplate,
  updateSelectedTemplateId,
} from "../../redux/feature/websitetemplate/TemplateSlice";

import CardTemplateDashboard from "../dashboard/CardTemplateDashboard";
import LogoLoading from "../loading/LogoLoading";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import PageNotFound from "../../pages/auth/PageNotFound";

const TemplateList = () => {
  const dispatch = useDispatch();
  const { templates, status, error } = useSelector((state) => state.templates);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const navigate = useNavigate();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTemplates());
    }

    // Initialize AOS only once
    AOS.init({ duration: 1000 });

    const handleResize = () => {
      setIsDropdown(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Cleanup function for event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [status, dispatch]);

  const handleSelectTemplate = async (templateId) => {
    const userId = 1; // Ensure the user ID is valid
    try {
      const action = await dispatch(selectTemplate({ userId, templateId }));
      if (selectTemplate.fulfilled.match(action)) {
        dispatch(updateSelectedTemplateId(templateId));
        await dispatch(fetchTemplateData(templateId));

        const selectedTemplate = templates.find(
          (template) => template.id === templateId
        );
        const templateType = selectedTemplate
          ? selectedTemplate.name.toLowerCase()
          : "developer";

        switch (templateType) {
          case "photography":
            navigate("/dashboard/photography");
            break;
          case "marketing":
            navigate("/dashboard/marketing");
            break;
          case "business":
            navigate("/dashboard/business");
            break;
          default:
            navigate("/dashboard/developer");
            break;
        }
      } else {
        console.error(action.payload || action.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
    AOS.refresh();
  };

  const filteredTemplates =
    activeFilter === "All"
      ? templates
      : templates.filter((template) => template.name === activeFilter);

  const handlePreviewClick = (templateId) => {
    setSelectedTemplateId(templateId);
  };

  const handleNavigateToPreview = () => {
    if (selectedTemplateId) {
      navigate(`/dashboard/preview/${selectedTemplateId}`);
    }
  };

  if (error === "No access token found") {
    return <p className="text-red-500">Please log in to view templates.</p>;
  }

  const handleGetStartClick = () => {
    // Ensure getAccessToken is defined or imported
    const isLoggedIn = !!getAccessToken();
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    // Simulate a loading state
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, []);

  return (
    <div>
      {/* {isLoading ? (
        <div className="flex flex-col gap-10">
          <div className="block md:hidden">
            <Skeleton height={40} />
          </div>
          <div className="hidden md:flex flex-row gap-5">
            <Skeleton height={40} width={100} />
            <Skeleton height={40} width={100} />
            <Skeleton height={40} width={100} />
            <Skeleton height={40} width={100} />
            <Skeleton height={40} width={100} />
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-5">
            <Skeleton width={350} height={300} />
            <Skeleton width={350} height={300} />
            <Skeleton width={350} height={300} />
            <Skeleton width={350} height={300} />
          </div>
        </div>
      ) : ( */}
        <div>
          {isDropdown ? (
            <select
              value={activeFilter}
              onChange={(e) => handleFilterClick(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              {["All", "Developer", "Photography", "Business", "Marketing"].map(
                (filterName) => (
                  <option key={filterName} value={filterName}>
                    {filterName}
                  </option>
                )
              )}
            </select>
          ) : (
            <div className="flex gap-4">
              {["All", "Developer", "Photography", "Business", "Marketing"].map(
                (filterName) => (
                  <button
                    key={filterName}
                    onClick={() => handleFilterClick(filterName)}
                    className={`px-5 py-2 rounded-md border-2 dark:text-gray-100 transition-all duration-300 transform ${
                      activeFilter === filterName
                        ? "bg-primary text-white border-primary scale-105"
                        : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white hover:scale-105"
                    }`}
                  >
                    {filterName}
                  </button>
                )
              )}
            </div>
          )}
          {status === "loading" && <LogoLoading />}
          {status === "succeeded" && (
            <div>
              <div className="flex flex-wrap sm:gap-5 mt-5 justify-start">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex-1 min-w-[300px] max-w-[400px] md:min-w-[350px] lg:min-w-[300px]"
                    data-aos="fade-up"
                  >
                    <CardTemplateDashboard
                      imageSrc={template.image}
                      title={template.name}
                      onSelect={() => handleSelectTemplate(template.id)}
                      onPreview={() => handlePreviewClick(template.id)}
                    />
                  </div>
                ))}
              </div>
              {selectedTemplateId && (
                <button
                  onClick={handleNavigateToPreview}
                  className="mt-5 px-5 py-2 bg-primary text-white rounded-md transition-all duration-300 hover:scale-105"
                >
                  Preview Selected Template
                </button>
              )}
            </div>
          )}
          {status === "failed" && (
            <p className="text-red-500">{<PageNotFound />}</p>
          )}
        </div>
      {/* )} */}
    </div>
  );
};

export default TemplateList;
