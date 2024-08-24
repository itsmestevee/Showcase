import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/business/NavbarComponent";
import HeroSectionBusiness from "../../components/business/HeroSectionBusiness";
import ServiceSectionBusiness from "../../components/business/ServiceSectionBusiness";
import AboutSection from "../../components/business/AboutSection";
import IndustriesSection from "../../components/business/IndustriesSection";
import RecentProjectSection from "../../components/business/RecentProjectSection";
import BlogSection from "../../components/business/BlogSection";
import ContactSection from "../../components/business/ContactSection";
import FooterBusines from "../../components/business/FooterBusines";
import { FaChartLine, FaBriefcase, FaSearch } from "react-icons/fa";
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { fetchTemplateData } from "../../redux/feature/websitetemplate/TemplateSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { fetchServices } from "../../redux/feature/websitetemplate/ServiceSlice";
import { fetchAboutMe } from "../../redux/feature/websitetemplate/aboutSlice";
import { fetchContacts } from "../../redux/feature/websitetemplate/ContactSlice";

const BusinessTemplate = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = ["About", "Project", "Blog", "Contact"];

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
    services,
    status: serviceStatus,
    error: serviceError,
  } = useSelector((state) => state.services);
  const {
    aboutData: about,
    status: aboutStatus,
    error: aboutError,
  } = useSelector((state) => state.about);
  const {
    contacts,
    status: contactStatus,
    error: contactError,
  } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchTemplateData("business"));
    dispatch(fetchServices("business"));
    dispatch(fetchAboutMe("business"));
    dispatch(fetchContacts("business"));
  }, [dispatch, isEditing]);

  if (
    templateStatus === "loading" ||
    serviceStatus === "loading" ||
    aboutStatus === "loading" ||
    contactStatus === "loading"
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4C3DE3"} loading={true} />
      </div>
    );
  }
  const mergedTemplateData = (templateData && templateData[0]) || {};
  const mergedServices = services || [];
  const mergedContacts = contacts || [];
  const mappedServices = mergedServices.map((service) => ({
    icon: service.image.length > 0 ? service.image[0].url : null, // Use the first image URL as the icon
    name: service.title,
    description: service.description,
  }));

  const recentProjectProps = {
    title: "Last Year We Have Completed 20+ Projects",
    subtitle: "OUR RECENT PROJECTS",
    categories: ["All", "Finance", "Analyzing", "Marketing"],
    projects: [
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        img: "/public/businessImg/RecentProject.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  };

  const industriesProps = {
    title: "We serve a wide variety of industries",
    subtitle: "WHY CHOOSE US?",
    industries: [
      {
        image: "/public/businessImg/Industries.png",
        title: "Faucibus et molestie ac",
        description:
          "Tortor dignissim convallis aenean et tortor at. Elementum nisi eleifend quam.",
      },
      {
        image: "/public/businessImg/Industries.png",
        title: "Egestas sed tempus urna",
        description:
          "Viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis.",
      },
      {
        image: "/public/businessImg/Industries.png",
        title: "Duis convallis convallis",
        description:
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
      },
    ],
  };

  const blogPosts = [
    {
      img: "/public/businessImg/blogImg1.png",
      author: "John Doe",
      title: "Which allows you to pay down insurance bills",
      description:
        "Ullamcorper a lacus vestibulum sed arcu non odio. Nulla porttitor massa id.",
    },
    {
      img: "/public/businessImg/blogImg1.png",
      author: "Jane Smith",
      title: "The importance of regular financial check-ups",
      description:
        "Vitae congue eu consequat ac felis donec et odio pellentesque.",
    },
    {
      img: "/public/businessImg/blogImg1.png",
      author: "Mike Johnson",
      title: "Understanding market trends for better investments",
      description:
        "Amet nisl suscipit adipiscing bibendum est ultricies integer quis.",
    },
  ];

  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <NavbarComponent
        // logo="/public/logoHomepage.png"
        // title="Showcase"
        logo={
          mergedTemplateData.portfolio_avatar ||
          "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
        }
        textLogo={mergedTemplateData.title || "Default Title"}
        navItems={navItems}
        onDarkModeToggle={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <HeroSectionBusiness
        button={"Learn more"}
        imgAlt={"business Strategy"}
        heroImage={
          mergedTemplateData.hero_image ||
          "https://i.pinimg.com/736x/79/08/3a/79083abd0bde44c79191d1612cdbc9eb.jpg"
        }
        introduction="INTRODUCTION"
        name={mergedTemplateData.created_by || "Default Name"}
        profession={mergedTemplateData.type || "Default Profession"}
        bio={mergedTemplateData.biography || "Default Biography"}
        isDarkMode={isDarkMode}
      />
      <ServiceSectionBusiness
        sectionTitle="Explore What We Offer"
        sectionSubtitle="OUR SERVICES"
        services={mappedServices}
        isDarkMode={isDarkMode}
      />
      <AboutSection
        img={about?.images?.[0]?.url || "defaultImageUrl"}
        icon1="/public/businessImg/Service2.png"
        icon2="/public/businessImg/Service3.png"
        title="Your Trusted Business Partner"
        subtitle="ABOUT ME"
        description1={about?.descriptions?.[0]?.long || "Default description"}
        description2={about?.descriptions?.[1]?.long || "Default description"}      
        description3={about?.descriptions?.[2]?.long || "Default description"}
        feature1="Lorem ipsum dolor sit amet, ad his ignota verterem recusabo. Meis pericula eum ad"
        feature2="Lorem ipsum dolor sit amet, ad his ignota verterem recusabo. Meis pericula eum ad"
        buttonText="Contact us now"
        isDarkMode={isDarkMode}
      />
      <IndustriesSection
        isDarkMode={isDarkMode}
        title={industriesProps.title}
        subtitle={industriesProps.subtitle}
        industries={industriesProps.industries}
      />
      <RecentProjectSection
        title={recentProjectProps.title}
        subtitle={recentProjectProps.subtitle}
        categories={recentProjectProps.categories}
        projects={recentProjectProps.projects}
        isDarkMode={isDarkMode}
      />
      <BlogSection isDarkMode={isDarkMode} blogPosts={blogPosts} />
      <ContactSection
      
        isDarkMode={isDarkMode}
        title="Don't Be a Stranger Just Say Hello."
        subtitle="GET IN TOUCH"
        description="Accumsan in nisl nisi scelerisque eu. Massa id neque aliquam vestibulum morbi blandit cursus. Molestie ac feugiat sed lectus vestibulum mattis."
        phoneNumbers={["+855 44 65 4545", "+855 44 65 4545"]}
        emails={["showcase@gmail.com", "info@gmail.com"]}
        officeLocation="TDP Agency The Barn Moat House Farm IP7 7DB"
        contactId={mergedContacts[0]?.id}
        initialAddress={mergedContacts[0]?.address}
        initialEmail={mergedContacts[0]?.contact_email}
        initialPhone={mergedContacts[0]?.phone}
        initialDesc={mergedContacts[0]?.description}
      />
      <FooterBusines
        isDarkMode={isDarkMode}
        navItems={["Home", "About", "Services", "Projects", "Blog", "Contact"]}
        socialIcons={[FaGithub, FaFacebook, FaTwitter, FaLinkedin]}
        developerInfo="@Showcase"
      />
    </div>
  );
};

export default BusinessTemplate;
