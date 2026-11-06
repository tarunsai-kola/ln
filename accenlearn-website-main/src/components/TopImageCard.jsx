import React from "react";
import { Card, Image, Button } from "antd";
import { Avatar } from "antd";
import { FaRunning } from "react-icons/fa";

const TopImageCard = ({ res, handleGetStartedClick }) => {
  return (
    <>
      <Card
        key={res.id}
        className="w-full !shadow-lg !shadow-secondary/20  !rounded-2xl !bg-white"
        hoverable
        cover={
          <img
            src={res.pic}
            className="lg:!h-[250px] !h-[100px] !w-full !object-contain lg:p-10 p-1 rounded-2xl !mix-blend-darken !bg-white"
          />
        }
      >
        <Card.Meta
          title={
            <h1 className="global_text !text-primary whitespace-normal !text-center !pb-4">
              {res.content}
            </h1>
          }
          className="!rounded-b-3xl"
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGetStartedClick}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
          >
            <FaRunning />
            <span>Get Started</span>
          </button>
        </div>
      </Card>
    </>
  );
};

export default TopImageCard;
