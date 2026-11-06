import React, { useState, useEffect } from "react";
import advance from "../../../../Accenlearn/images/advance.jpg";
import daad1 from "../../../../Accenlearn/images/daad1.jpg";
import daad2 from "../../../../Accenlearn/images/daad2.jpg";
import dmad1 from "../../../../Accenlearn/images/dmad1.jpg";
import dmad2 from "../../../../Accenlearn/images/dmad2.jpg";
import dsad1 from "../../../../Accenlearn/images/dsad1.jpg";
import dsad2 from "../../../../Accenlearn/images/dsad2.jpg";
import ibad1 from "../../../../Accenlearn/images/ibad1.jpg";
import ibad2 from "../../../../Accenlearn/images/ibad2.jpg";
import msad1 from "../../../../Accenlearn/images/msad1.jpg";
import pead1 from "../../../../Accenlearn/images/pead1.jpg";
import pead2 from "../../../../Accenlearn/images/pead2.jpg";
import pmad1 from "../../../../Accenlearn/images/pmad1.jpg";
import pmad2 from "../../../../Accenlearn/images/pmad2.jpg";
import publicspeech from "../../../../Accenlearn/images/publicspeech.jpg";

const images = [
  advance,
  daad1,
  daad2,
  dmad1,
  dmad2,
  dsad1,
  dsad2,
  ibad1,
  ibad2,
  msad1,
  pead1,
  pead2,
  pmad1,
  pmad2,
  publicspeech,
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: "inherit" }}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            borderRadius: "inherit",
          }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
