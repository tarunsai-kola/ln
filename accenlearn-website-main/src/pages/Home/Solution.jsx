import React from "react";
import TitleText from "../../components/TitleText";
import LeftImageCard from "../../components/LeftImageCard";
import { Collapse } from "antd";

const SOLUTION_POINTS = [
  {
    title: "Customized Training Programs",
    content:
      "Tailor-made learning paths aligned with your organization’s goals, roles, and industry requirements — maximizing relevance and ROI.",
  },
  {
    title: "Industry-Expert Led Training",
    content:
      "Sessions run by seasoned professionals who bring real-world insights, case studies, and practical expertise into every module.",
  },
  {
    title: "Skill Gap Analysis & Workforce Readiness",
    content:
      "Identify competency gaps and build future-ready skills in emerging tech, leadership, and digital transformation.",
  },
];

const Solution = () => {
  return (
    <section className="w-full bg-primary rounded-4xl text-white py-16 px-4 lg:px-20 mt-20">
      {/* Title */}
      <TitleText descriptionClass={`!text-white`} title={`Corporate Solutions`} description={`AccenLearn delivers customized corporate learning solutions to upskill, reskill, and future-proof your workforce with measurable business impact.`} />

    {/* Content */}
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {/* Left Image */}
      <div className="lg:w-1/2 w-full">
        <img
          src={"https://img.freepik.com/free-photo/woman-sitting-happily-with-laptop-table_1150-26786.jpg?semt=ais_hybrid&w=740&q=80"}
          alt="Corporate Solutions"
          className="rounded-3xl w-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 w-full flex flex-col gap-8">
        {SOLUTION_POINTS.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            {/* Arrow */}
            <div className="text-white text-2xl mt-1">➜</div>

            {/* Text */}
            <div>
              <h4 className="text-xl font-semibold mb-1 !text-secondary">
                {item.title}
              </h4>
              <p className="global_text !text-white">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Solution;
