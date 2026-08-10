import React from "react";
import Programs from "./Programs";
import About from "./About";
import StatsCounter from "./StatsCounter";
import Hiring from "./Hiring";
import Sponsers from "./Sponsers";
import Curriculum from "./Curriculum";
import Workshop from "./Workshop";
import WhyBetter from "./WhyBetter";
import FAQ from "./FAQ";
import Solution from "./Solution";
import Enrole from "./Enrole";
import Feedback from "./Feedback";
import { Divider } from "antd";

const Home = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed relative flex flex-col items-center justify-center w-full overflow-x-hidden">
      <StatsCounter />
      <About />
      <Sponsers provides={false} />
      <Programs />
      <Curriculum />
      <Workshop />
      <WhyBetter />
      <FAQ />
      <Solution />
      <Enrole />
      <Feedback />
    </div>
  );
};

export default Home;
