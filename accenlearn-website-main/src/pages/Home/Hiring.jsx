import React from "react";
import { useNavigate } from "react-router-dom";
import {  BackgroundButton } from "../../components/Button";
import { HIRING_DATA, HIRING_DATA2 } from "../../shared/data";
import TopImageCard from "../../components/TopImageCard";
import BackgroundImageCard from "../../components/backgroundImageCard";

const Hiring = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="grid lg:grid-cols-4 w-full h-full gap-2 py-5 grid-cols-1 bg-white lg:px-20">
        {HIRING_DATA?.map((res, index) => {
          return (
            <div data-aos="fade-up" key={index}>
              <TopImageCard res={res} />
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 w-full flex-col">
        <div className='relative  w-full lg:min-h-[60vh] min-h-[40vh] bg-fixed  bg-[url("https://img.freepik.com/premium-vector/job-offer-vector-illustration-with-businessman-recruitment-search-vacancy-company-templates_2175-15656.jpg?semt=ais_hybrid&w=740&q=80")] bg-cover bg-center bg-no-repeat lg:py-20 py-10'>
          <div className="w-full h-full bg-primary/50  top-0 left-0 absolute z-10 flex flex-col items-center  justify-center">
            <h1 className="title_text !text-white" data-aos="fade-up">
              250+ Hiring Partners
            </h1>
            <p className="global_text !text-white" data-aos="fade-up">
              170+ Global Mentors
            </p>
            <div className="flex flex-col items-center justify-center pt-10">
              <BackgroundButton text="Enquire Now" onClick={() => navigate("/internship")} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 w-full h-full gap-2 grid-cols-1 flex-1 py-5">
          {HIRING_DATA2?.map((res, index) => {
            return (
              <div data-aos="fade-up" key={index}>
                <BackgroundImageCard res={res} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hiring;
