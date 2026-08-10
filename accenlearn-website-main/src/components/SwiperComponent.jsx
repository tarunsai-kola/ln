import React from "react";
import { Swiper } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const SwiperComponent = ({ component, count, navigation }) => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={navigation ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        } : false}
        pagination={false}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="w-full"
        breakpoints={{
          480: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 1.6,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: Math.min(count || 3, 3),
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: Math.min(count || 3, 4),
            spaceBetween: 24,
          },
        }}
      >
        {component}
      </Swiper>
      {navigation && (
        <div className="absolute lg:flex hidden right-2 sm:right-4 md:right-8 lg:right-12 -top-10 gap-2 sm:gap-3 z-10">
          <div className="swiper-button-prev cursor-pointer bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-secondary">
            <FaArrowLeft className="text-base sm:text-lg text-white bg-secondary rounded-full p-1" />
          </div>
          <div className="swiper-button-next cursor-pointer bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-secondary">
            <FaArrowRight className="text-base sm:text-lg text-white bg-secondary rounded-full p-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SwiperComponent;
