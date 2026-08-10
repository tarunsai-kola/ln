import React from "react";
import {
  ABOUT_DATA,
  HIRING_DATA,
  HIRING_DATA2,
} from "../../shared/data";
import TitleText from "../../components/TitleText";
import { TfiWorld } from "react-icons/tfi";

const About = () => {
  return (
    <section className="w-full py-10">
      {/* Title */}
      <div>
        <TitleText title={ABOUT_DATA?.[0]?.title} animate={false} />
      </div>

      {/* Description */}
      <p className="global_text  mx-auto text-center leading-relaxed mb-10">
        {ABOUT_DATA[0]?.text}
      </p>

      {/* Key Numbers */}
      <div className="flex flex-wrap justify-center gap-8 mb-14">
        <div className="flex flex-col items-center">
          <TfiWorld className="text-secondary text-3xl mb-2" />
          <h2 className="text-2xl font-semibold text-black">250+</h2>
          <p className="text-sm text-gray-600">Hiring Partners</p>
        </div>

        <div className="flex flex-col items-center">
          <TfiWorld className="text-secondary text-3xl mb-2" />
          <h2 className="text-2xl font-semibold text-black">170+</h2>
          <p className="text-sm text-gray-600">Global Mentors</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT BOX */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Our Strengths
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HIRING_DATA.map((res, index) => {
              const Icon = res?.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl p-6 flex flex-col items-center text-center gap-4 bg-gray-50 hover:bg-white hover:shadow transition"
                >
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon size={28} className="text-secondary" />
                  </div>
                  <h4 className="font-medium text-gray-800">
                    {res?.content}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT BOX */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Why Choose Us
          </h3>

          <div className="flex flex-col gap-4">
            {HIRING_DATA2.map((res, index) => {
              const Icon = res?.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon size={22} className="text-secondary" />
                  </div>
                  <p className="global_text font-medium">
                    {res?.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
