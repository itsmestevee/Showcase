import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartResume from "./CartResume";
import {
  fetchWorkExperiences,
  selectWorkExperiences,
} from "../../redux/feature/websitetemplate/WorkExperienceSlice";

function MyResumeSection({ template }) {
  const dispatch = useDispatch();
  const workExperiences = useSelector(selectWorkExperiences);
  const status = useSelector((state) => state.workExperiences.status);
  const error = useSelector((state) => state.workExperiences.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkExperiences(template));
    }
  }, [status, dispatch, template]);

  return (
    <section
      className="py-10 xl:py-20 font-sans section flex flex-col gap-10 bg-[#F7F7F7] dark:bg-gray-800"
      name="about"
    >
      <div className="flex flex-col justify-center items-center gap-6 text-center">
        <p className="text-lg dark:text-gray-100">Check Out My Resume</p>
        <h2 className="text-4xl sm:text-5xl font-bold">
          <span className="dark:text-gray-100">My</span>{" "}
          <span className="text-primary-developer-template">Resume</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-20 px-4 lg:px-20">
        {/* Experience */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold dark:text-gray-100 text-center">
            Experience
          </h2>

          {workExperiences.map((exp, index) => (
            <CartResume
              key={index}
              id={exp.id}
              title={exp.company_name}
              subtitle={exp.job_title}
              description={exp.work_address}
            />
          ))}
        </div>

        {/* Education */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold dark:text-gray-100 text-center">
            Education
          </h2>

          {workExperiences.map((exp, index) => (
            <CartResume
              key={index}
              id={exp.id}
              title={exp.company_name}
              subtitle={exp.job_description}
              description={exp.responsibility}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyResumeSection;
