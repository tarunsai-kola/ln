import React from "react";
import { ABOUT_DATA } from "../../shared/data";

const badgeSets = [
  ["Impact-driven learning", "Career-first focus"],
  ["Trusted mentorship", "Flexible access"],
  ["Hands-on programs", "Industry aligned"],
  ["Vision-led growth", "Mission in action"],
];

const Objective = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4">
      {ABOUT_DATA?.slice(1, 5).map((item, index) => {
        const badges = badgeSets[index] || ["Learner focused", "Industry ready"];
        const isEven = index % 2 === 0;

        return (
          <div
            key={item.id ?? index}
            data-aos="fade-up"
            className="relative overflow-hidden rounded-3xl "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-60" />

            <div className="relative grid items-center gap-8 p-6 md:p-10 lg:grid-cols-2">
              <div className={isEven ? "" : "lg:order-2"}>
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                  {item.title}
                </div>
                <p className="global_text text-justify mt-4">
                  {item.text}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-primary/5 text-primary border border-primary/10 px-3 py-1 text-xs font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${isEven ? "" : "lg:order-1"} flex justify-center`}>
                <div className="relative w-full max-w-md">
                  <div
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-secondary/25 blur"
                    aria-hidden="true"
                  />
                  <img
                    src={item.pic}
                    alt={item.title}
                    className="relative h-[260px] sm:h-[300px] lg:h-[340px] w-full rounded-3xl object-cover shadow-lg border border-white"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Objective;
