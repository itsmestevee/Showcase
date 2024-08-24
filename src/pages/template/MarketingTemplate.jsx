import { NavbarComponent } from "../../components/marketing/NavbarComponent";
import FooterComponent from "../../components/marketing/FooterComponent";
import React, { useEffect } from "react";
import { TopSection } from "../../components/marketing/TopSection";
import ServiceSection from "../../components/marketing/ServiceSection";
import AticalSection from "../../components/marketing/AticalSection";
import TestimonialSection from "../../components/marketing/TestimonialSection";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplateData } from "../../redux/feature/websitetemplate/TemplateSlice";
import { fetchWorkExperiences } from "../../redux/feature/websitetemplate/WorkExperienceSlice";
import { fetchContacts } from "../../redux/feature/websitetemplate/ContactSlice";
import { fetchBlogs } from "../../redux/feature/websitetemplate/BlogSlice";
import { fetchSkills } from "../../redux/feature/websitetemplate/SkillSlice";
import { fetchServices } from "../../redux/feature/websitetemplate/ServiceSlice";
import { fetchProjects } from "../../redux/feature/websitetemplate/ProjectSlice";
import { ClipLoader } from "react-spinners";

const MarketingTemplate = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const templateId = 1;
    dispatch(fetchTemplateData(templateId));
    dispatch(fetchWorkExperiences());
    dispatch(fetchContacts());
    dispatch(fetchBlogs());
    dispatch(fetchSkills());
    dispatch(fetchServices());
    dispatch(fetchProjects());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#4C3DE3"} loading={true} />
      </div>
    );
  }

  const staticData = {
    name: "Elon Musk",
    profession: "Developer",
    biography:
      "CEO and chief engineer of SpaceX, a private aerospace manufacturer.",
    heroImage: "/developerimage/imgHeroDev.png",
    socialMediaLinks: [
      { type: "facebook", url: "https://facebook.com/" },
      { type: "github", url: "https://github.com/" },
    ],

    sectionImage: "/developerimage/aboutImg.png",
    title: "Elon",
    lastName: "Musk",
    birthDate: "24 April 1993",
    nationality: "Khmer",
    experience: "7 years",
    address: "Phnom Penh",
    freelance: "Available",
    language: "Khmer, English",
    phone: "+855 977 34 54 71",
    email: "example@gmail.com",
    logoImage: "/logoHomepage.png",
    textLogo: "Showcase",
    workExperiences: [
      {
        id: 1,
        job_title: "Data Analyst",
        company_name: "Insight Analytics LLC",
        job_description:
          "Analyzed large datasets to identify trends and patterns. Created interactive dashboards using Tableau and Power BI. Provided actionable insights to improve business decision-making.",
        hired_date: "2022-06-15T00:00:00Z",
        achievements: "Optimized data processing workflows",
        position: "Analyst",
        responsibility: "Data analysis",
        work_address: "456 Market Ave",
      },
      {
        id: 2,
        job_title: "Project Manager",
        company_name: "Build It Right Corp.",
        job_description:
          "Managed multiple construction projects from inception to completion. Coordinated with contractors, suppliers, and clients to ensure timely project delivery. Monitored project budgets and timelines.",
        hired_date: "2021-09-01T00:00:00Z",
        achievements: "Successfully delivered complex projects on time",
        work_address: "789 Industrial Blvd",
      },
      {
        id: 3,
        job_title: "Marketing Specialist",
        company_name: "Creative Media Group",
        job_description:
          "Developed and executed marketing campaigns across digital and print platforms. Conducted market research to identify customer needs and preferences. Collaborated with design and content teams to create promotional materials.",
        hired_date: "2023-03-01T00:00:00Z",
        achievements: "Increased social media engagement by 50%",
        position: "Specialist",
        responsibility: "Marketing strategy",
        work_address: "1010 Digital Plaza",
      },
    ],
    skills: [
      {
        id: 1,
        title: "Python",
        image: [
          {
            url: "/developerimage/pythonImg.png",
          },
        ],
      },
      {
        id: 2,
        title: "Javascript",
        image: [
          {
            url: "/developerimage/javascriptImg.png",
          },
        ],
      },
      {
        id: 3,
        title: "Java",
        image: [
          {
            url: "/developerimage/javaImg.png",
          },
        ],
      },
      {
        id: 4,
        title: "C#",
        image: [
          {
            url: "/developerimage/cSharp.png",
          },
        ],
      },
      {
        id: 5,
        title: "Swift",
        image: [
          {
            url: "/developerimage/swift.png",
          },
        ],
      },
      {
        id: 6,
        title: "TypeScript",
        image: [
          {
            url: "/developerimage/typeScript.png",
          },
        ],
      },
      {
        id: 7,
        title: "Kotlin",
        image: [
          {
            url: "/developerimage/kotlin.png",
          },
        ],
      },
      {
        id: 8,
        title: "Ruby",
        image: [
          {
            url: "/developerimage/ruby.png",
          },
        ],
      },
      {
        id: 8,
        title: "Rust",
        image: [
          {
            url: "/developerimage/rust.png",
          },
        ],
      },
      {
        id: 9,
        title: "Go",
        image: [
          {
            url: "/developerimage/go.png",
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project1.png",
      },
      {
        id: 2,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project2.png",
      },
      {
        id: 3,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project3.png",
      },
      {
        id: 4,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project4.png",
      },
      {
        id: 5,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project5.png",
      },
      {
        id: 6,
        title: "Web Development",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        project_image: "/developerimage/project6.png",
      },
    ],
    blogs: [
      {
        id: 1,
        title: "The Importance Of Web Design",
        description:
          "This blog post underscores the importance of web design as an integral part of the marketing strategy.",
        image: [
          {
            url: "/developerimage/blog1.png",
          },
        ],
      },
      {
        id: 2,
        title: "Mobile-First Approach",
        description:
          "With the increasing dominance of mobile devices, responsive and mobile-optimized web...",
        image: [
          {
            url: "/developerimage/blog2.png",
          },
        ],
      },
      {
        id: 3,
        title: "Personalization and User Experience",
        description:
          "Personalized user experiences, tailored to individual preferences and behaviors...",
        image: [
          {
            url: "/developerimage/blog3.png",
          },
        ],
      },
    ],
  };

  const mergedTemplateData = templateData || staticData;
  const mergedWorkExperiences = workExperiences.length ? workExperiences : staticData.workExperiences;
  const mergedContacts = contacts.length ? contacts : staticData.contacts;
  const mergedBlogs = blogs.length ? blogs : staticData.blogs;
  const mergedSkills = skills.length ? skills : staticData.skills;
  const mergedServices = services.length ? services : staticData.services;
  const mergedProjects = projects.length ? projects : staticData.projects;
  return (
    <div>
      <motion.div
        className="xl:mx-60 lg:mx-32 md:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <NavbarComponent logoName={mergedTemplateData.title} />
      </motion.div>
      <div>
        <TopSection
        heroImage={mergedTemplateData.hero_image || staticData.heroImage}
          biography={mergedTemplateData.biography}
          name={mergedTemplateData.name}
          profession={mergedTemplateData.profession || staticData.profession}
        />
      </div>
      <br />
      <div className="w-full bg-marketing-main-color py-32 mt-32">
        <ServiceSection services={mergedServices} />
      </div>
      <div>
        <AticalSection />
      </div>
      <div>
        <TestimonialSection />
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
};
export default MarketingTemplate;
