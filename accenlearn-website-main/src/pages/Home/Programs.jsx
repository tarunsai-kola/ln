import React from 'react'
import { PROGRAM_DATAS } from '../../shared/data';
import TitleText from "../../components/TitleText";
import SwiperComponent from '../../components/SwiperComponent';
import { SwiperSlide } from 'swiper/react';


const Programs = () => {
  return (
    <div className="w-full min-h-[50vh] py-16">
      {/* Programs */}
      <TitleText title="ABOUT OUR PROGRAMS" />
      <div className="mt-12 px-4">
        <SwiperComponent
          count={5}
          component={PROGRAM_DATAS?.map((res, index) => (
            <SwiperSlide key={index}>
              <div className="h-full py-4">
                <div className="group bg-white h-[350px] shadow-[0px_15px_30px_rgba(0,0,0,0.05)] p-9 space-y-4 relative overflow-hidden flex flex-col rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="h-1.5 w-12 bg-secondary rounded-full"></div>
                  <h1 className="font-bold text-xl global_text !text-primary leading-tight">{res?.title}</h1>
                  <p className="global_text !text-gray-600 !text-sm leading-relaxed flex-grow">
                    {res?.content}
                  </p>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-secondary/10 transition-colors duration-500"></div>
                  
                  {/* Subtle decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        />
      </div>
    </div>
  );
}

export default Programs
