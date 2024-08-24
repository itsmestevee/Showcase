import React from "react";
import { useDispatch } from "react-redux";
import CardSkill from "./CardSkill";
import { createSkill } from "../../redux/feature/websitetemplate/SkillSlice";

const MySkillSection = ({ skills }) => {
  const dispatch = useDispatch();

  const handleSaveSkill = (newSkill) => {
    dispatch(createSkill(newSkill)); // Use the createSkill action to save the new skill
  };

  return (
    <section
      className="py-20 font-sans section flex flex-col justify-center items-center w-full px-4 sm:px-10 bg-white dark:bg-gray-900"
      name="about"
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <p className="text-lg dark:text-gray-100 text-center">
          My Level Of Knowledge In Some Tools
        </p>
        <h2 className="text-5xl font-bold text-center">
          <span className="dark:text-gray-100">My</span>{" "}
          <span className="text-primary-developer-template">Skills</span>
        </h2>
        <div className="w-32 rounded-md h-1 bg-primary"></div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 w-full lg:px-52 mt-10">
        {skills.map((skill) => (
          <CardSkill
            key={skill.id}
            img={skill.image[0]?.url}
            title={skill.title}
            desc={skill.description}
            onSave={handleSaveSkill} // Pass the createSkill handler here
          />
        ))}
      </div>
    </section>
  );
};

export default MySkillSection;
