import React from "react";
import { TfiCup } from "react-icons/tfi";

const BackgroundImageCard = ({ res }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${res.pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-full rounded-2xl flex-1 "
    >
      <div className="w-full h-[200px] bg-white/100 rounded-2xl z-10 flex flex-col items-center  justify-center">
        <h1 className="global_text !text-primary !text-center !font-bold">
          <TfiCup className="!text-primary !text-2xl" /> <br /> {res.content}
        </h1>
      </div>
    </div>
  );
};

export default BackgroundImageCard;
