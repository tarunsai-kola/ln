import React from "react";
import Programs from "./Programs";
import About from "./About";
import Hiring from "./Hiring";
import Sponsers from "./Sponsers";
import Workshop from "./Workshop";
import WhyBetter from "./WhyBetter";
import FAQ from "./FAQ";
import Enrole from "./Enrole";
import Feedback from "./Feedback";
import { Divider } from "antd";

const Home = () => {
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed relative flex flex-col items-center justify-center w-full overflow-x-hidden">
      <About />
      <Sponsers provides={false} />
      <Programs />
      <Workshop />
      <WhyBetter />
      <FAQ />
      <Enrole />
      <Feedback />
    </div>
  );
};

export default Home;
