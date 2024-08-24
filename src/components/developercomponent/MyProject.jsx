import React from "react";
import { useDispatch } from "react-redux";
import CardProject from "./CardProject";
import { createProject } from "../../redux/feature/websitetemplate/ProjectSlice";

function MyProject({ projects }) {
  const dispatch = useDispatch();

  const handleSaveProject = (projectData) => {
    console.log("Saving project data:", projectData); // Debugging line
    dispatch(createProject(projectData));
  };

  const handleRemoveProject = (projectId) => {
    // Implement the remove logic if required
  };

  return (
    <section
      className="py-20 font-sans section flex flex-col justify-center items-center sm:gap-10 bg-white dark:bg-gray-900"
      name="project"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-lg dark:text-gray-100">
          Showcasing Some Of My Best Work
        </p>
        <h2 className="text-5xl font-bold">
          <span className="dark:text-gray-100">My</span>{" "}
          <span className="text-primary-developer-template">Project</span>
        </h2>
        <div className="w-32 rounded-md h-1 bg-primary"></div>
      </div>
      <div className="flex flex-wrap justify-center items-center sm-max:mt-10 gap-4 xl:px-20 w-[80%]">
        {projects.map((project, index) => (
          <CardProject
            key={project.id || index} // Ensure each child has a unique key
            img={project.project_image}
            title={project.project_title}
            desc={project.project_description}
            link={project.link_to_project}
            onSave={handleSaveProject}
            onRemove={() => handleRemoveProject(project.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default MyProject;
