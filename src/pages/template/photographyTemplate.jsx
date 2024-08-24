import { Button } from "flowbite-react";
// import Project from "../../components/photography/Project";
import NavbarComponent from "../../components/photography/Navbar";
import HomepageComponent from "../../components/photography/Homepage";
import FooterComponent from "../../components/photography/Footer";
import React, { useEffect, useState } from "react";
import AboutComponent from "../../components/photography/About";
import ProjectComponent from "../../components/photography/Project";
import BlogComponent from "../../components/photography/Blog";
import ContactUsComponent from "../../components/photography/ContactUs";
import { useDispatch, useSelector } from "react-redux";
// import { PhotographyComponent } from "../../components/photography/Photography";
import { fetchWorkExperiences } from "./../../redux/feature/websitetemplate/WorkExperienceSlice";
import { fetchContacts } from "./../../redux/feature/websitetemplate/ContactSlice";
import { fetchBlogs } from "./../../redux/feature/websitetemplate/BlogSlice";
import { fetchSkills } from "./../../redux/feature/websitetemplate/SkillSlice";
import { fetchServices } from "./../../redux/feature/websitetemplate/ServiceSlice";
import { fetchProjects } from "./../../redux/feature/websitetemplate/ProjectSlice";
import { fetchAboutMe } from "./../../redux/feature/websitetemplate/aboutSlice";
import { fetchTemplateData } from "../../redux/feature/websitetemplate/TemplateSlice";
import { ClipLoader } from "react-spinners";

const PhotographyTemplate = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  const {
    templateData,
    status: templateStatus,
    error: templateError,
  } = useSelector((state) => state.templates);
  const {
    workExperiences,
    status: workStatus,
    error: workError,
  } = useSelector((state) => state.workExperiences);
  const {
    contacts,
    status: contactStatus,
    error: contactError,
  } = useSelector((state) => state.contacts);
  const {
    blogs,
    status: blogStatus,
    error: blogError,
  } = useSelector((state) => state.blogs);
  const {
    skills,
    status: skillStatus,
    error: skillError,
  } = useSelector((state) => state.skills);
  const {
    services,
    status: serviceStatus,
    error: serviceError,
  } = useSelector((state) => state.services);
  const {
    projects,
    status: projectStatus,
    error: projectError,
  } = useSelector((state) => state.projects);
  const {
    aboutData: about,
    status: aboutStatus,
    error: aboutError,
  } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchTemplateData("photography"));
    dispatch(fetchWorkExperiences("photography"));
    dispatch(fetchContacts("photography"));
    dispatch(fetchBlogs("photography"));
    dispatch(fetchSkills("photography"));
    dispatch(fetchServices("photography"));
    dispatch(fetchProjects("photography"));
    dispatch(fetchAboutMe("photography"));
  }, [dispatch, isEditing]);

  if (
    templateStatus === "loading" ||
    workStatus === "loading" ||
    contactStatus === "loading" ||
    blogStatus === "loading" ||
    skillStatus === "loading" ||
    serviceStatus === "loading" ||
    projectStatus === "loading" ||
    aboutStatus === "loading"
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4C3DE3"} loading={true} />
      </div>
    );
  }

  const mergedTemplateData = (templateData && templateData[0]) || {};
  const mergedWorkExperiences = workExperiences || [];
  const mergedContacts = contacts || [];
  const mergedBlogs = blogs || [];
  const mergedSkills = skills || [];
  const mergedProjects = projects || [];
  const socialMediaLinks = (
    mergedTemplateData.social_media_link_json || []
  ).map((url) => {
    if (url.includes("facebook")) {
      return { type: "facebook", url };
    } else if (url.includes("x.com") || url.includes("twitter.com")) {
      return { type: "x", url };
    } else if (url.includes("instagram")) {
      return { type: "instagram", url };
    } else if (url.includes("pinterest")) {
      return { type: "pinterest", url };
    }
    return { type: "unknown", url };
  });
  return (
    <div>
      <NavbarComponent textLogo={mergedTemplateData.title || "Default Title"} />
      <HomepageComponent
        heroImage={
          mergedTemplateData.hero_image ||
          "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
        }
        introduction="INTRODUCTION"
        name={mergedTemplateData.created_by || "Default Name"}
        profession={mergedTemplateData.type || "Default Profession"}
        bio={mergedTemplateData.biography || "Default Biography"}
        socialMediaLinks={socialMediaLinks}
        textLogo={mergedTemplateData.title || "Default Title"}
        descriptions={
          Array.isArray(about.descriptions) ? about.descriptions : []
        }
        images={about.images }c
      />
      <AboutComponent
        name={mergedTemplateData.created_by || "Default Name"}
        profession={mergedTemplateData.type || "Default Profession"}
        avatar={about.images?.[0]?.url || ""}
        descriptions={
          Array.isArray(about.descriptions) ? about.descriptions : []
        }
      />
      <ProjectComponent projects={mergedProjects} />
      <BlogComponent blogs={mergedBlogs} />
      <ContactUsComponent
        contactId={mergedContacts[0]?.id}
        initialDesc={mergedContacts[0]?.description}
      />
      <FooterComponent socialMediaLinks={socialMediaLinks} />
    </div>
  );
};

export default PhotographyTemplate;
