import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div className="m-3 sm:m-5 md:m-3 lg:m-5">
        <img
          className="w-screen h-[60vh] sm:h-[70vh] md:h-[85vh] rounded-lg sm:opacity-80 md:opacity-100"
          src={assets.hero}
          alt="hero_img"
        />
      </div>

      <div className="hidden sm:flex absolute sm:mt-24 inset-0  flex-col text-center">
        <h2 className="text-md sm:text-3xl md:text-4xl font-bold">
          Explore the World with Trip
          <span className="text-blue-700">Mate</span>
        </h2>
        <p className="text-xl sm:text-3xl md:text-4xl mt-2 font-bold">
          Let’s Make Every Trip Perfect!
        </p>
      </div>
    </div>
  );
};

export default Hero;
