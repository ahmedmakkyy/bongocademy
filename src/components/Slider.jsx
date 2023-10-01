import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
const Slider = () => {
  useEffect(() => {
    Aos.init();
  }, [])
  const quotes = [
    "Don't watch the clock; do what it does. Keep going.",
    "Sports is the ultimate teacher.",
    "Success is where preparation and opportunity meet.",
    "The difference between the impossible and the possible lies in determination.",
  ];

  return (
    <div className="" data-aos="zoom-in">
      <div className="carousel w-full h-112">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="./1.png" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="./2.png" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        {/* <div id="slide3" className="carousel-item relative w-full">
          <img src="./slide-3.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div> */}
        {/* <div id="slide4" className="carousel-item relative w-full">
          <img src="./slide-4.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Slider;
