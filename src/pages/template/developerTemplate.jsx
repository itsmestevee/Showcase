import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { fetchTemplateData } from "../../redux/feature/websitetemplate/TemplateSlice";
import { fetchWorkExperiences } from "../../redux/feature/websitetemplate/WorkExperienceSlice";
import { fetchContacts } from "../../redux/feature/websitetemplate/ContactSlice";
import { fetchBlogs } from "../../redux/feature/websitetemplate/BlogSlice";
import { fetchSkills } from "../../redux/feature/websitetemplate/SkillSlice";
import { fetchServices } from "../../redux/feature/websitetemplate/ServiceSlice";
import { fetchProjects } from "../../redux/feature/websitetemplate/ProjectSlice";
import { fetchAboutMe } from "../../redux/feature/websitetemplate/aboutSlice";
import NavBarComponent from "../../components/developercomponent/Navbar";
import HeroSection from "../../components/developercomponent/HeroSection";
import AboutMeSectionDev from "../../components/developercomponent/AboutMeSectionDev";
import MyResumeSection from "../../components/developercomponent/MyResumeSection";
import MySkillSection from "../../components/developercomponent/MySkillSection";
import MyProject from "../../components/developercomponent/MyProject";
import BlogSection from "../../components/developercomponent/BlogSection";
import ContactSection from "../../components/developercomponent/ContactSection";
import FooterSection from "../../components/developercomponent/FooterSection";

const DeveloperTemplate = () => {
  const dispatch = useDispatch();
  const { templateData, status: templateStatus } = useSelector(
    (state) => state.templates
  );
  const { workExperiences } = useSelector((state) => state.workExperiences);
  const { contacts } = useSelector((state) => state.contacts);
  const { blogs, status: blogStatus } = useSelector((state) => state.blogs);
  const { skills } = useSelector((state) => state.skills);
  const { services } = useSelector((state) => state.services);
  const { projects } = useSelector((state) => state.projects);
  const { about } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchTemplateData("developer"));
    dispatch(fetchWorkExperiences("developer"));
    dispatch(fetchContacts("developer"));
    dispatch(fetchBlogs("developer"));
    dispatch(fetchSkills("developer"));
    dispatch(fetchServices("developer"));
    dispatch(fetchProjects("developer"));
    dispatch(fetchAboutMe("developer"));
  }, [dispatch]);

  if (templateStatus === "loading" || blogStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4C3DE3"} loading={true} />
      </div>
    );
  }

  const mergedTemplateData = templateData && templateData[0];
  const mergedBlogs = blogs || [];
  console.log(mergedTemplateData);
  return (
    <div className="w-full h-auto">
      <NavBarComponent
        logo={mergedTemplateData?.portfolio_avatar || "default_logo.jpg"}
        textLogo={mergedTemplateData?.title || "Default Title"}
      />
      <HeroSection
        heroImage={mergedTemplateData?.hero_image || "default_hero_image.jpg"}
        introduction="INTRODUCTION"
        name={mergedTemplateData?.created_by || "Default Name"}
        profession={mergedTemplateData?.type || "Default Profession"}
        bio={mergedTemplateData?.biography || "Default Biography"}
      />
      <AboutMeSectionDev
        avatar={about?.images?.[0]?.url || ""}
        firstName={about?.personal_info?.first_name || ""}
        lastName={about?.personal_info?.last_name || ""}
        birthDate={about?.personal_info?.date_of_birth || ""}
        nationality={about?.personal_info?.nationality || ""}
        experience={about?.personal_info?.experience || ""}
        address={`${about?.personal_info?.address?.street || ""}, ${
          about?.personal_info?.address?.city || ""
        }, ${about?.personal_info?.address?.state || ""}, ${
          about?.personal_info?.address?.zip || ""
        }, ${about?.personal_info?.address?.country || ""}`}
        freelance={
          about?.titles?.map((title) => title.subtitle).join(", ") ||
          "Available"
        }
        language={about?.personal_info?.languages?.join(", ") || ""}
        phone={
          about?.personal_info?.contacts?.find(
            (contact) => contact.type === "phone"
          )?.value || ""
        }
        email={
          about?.personal_info?.contacts?.find(
            (contact) => contact.type === "email"
          )?.value || ""
        }
      />
      <MyResumeSection workExperiences={workExperiences} />
      <MySkillSection skills={skills} />
      <MyProject projects={projects} />
      <BlogSection blogs={mergedBlogs} />
      <ContactSection
        contactId={contacts?.[0]?.id}
        initialAddress={contacts?.[0]?.address}
        initialEmail={contacts?.[0]?.contact_email}
        initialPhone={contacts?.[0]?.phone}
        initialDesc={contacts?.[0]?.description}
      />
      <FooterSection />
    </div>
  );
};

export default DeveloperTemplate;
