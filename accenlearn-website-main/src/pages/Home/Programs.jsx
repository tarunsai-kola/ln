import React from 'react'
import { PROGRAM_DATAS } from '../../shared/data';
import TitleText from "../../components/TitleText";
import SwiperComponent from '../../components/SwiperComponent';
import { SwiperSlide } from 'swiper/react';

const programImages = [
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2187&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"  
];

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
              <div className="h-full py-4 px-2">
                <div className="group bg-white h-[450px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col rounded-3xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                  
                  {/* Top Image Half */}
                  <div className="h-[45%] w-full relative overflow-hidden">
                    <img 
                      src={programImages[index % programImages.length]} 
                      alt={res?.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Bottom Text Half */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white relative z-10">
                    <div className="h-1.5 w-12 bg-blue-600 rounded-full mb-4"></div>
                    <h3 className="font-bold text-xl text-slate-800 leading-tight mb-3">{res?.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                      {res?.content}
                    </p>
                  </div>
                  
                  {/* Subtle decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20"></div>
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
