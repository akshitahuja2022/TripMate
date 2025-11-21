import React from "react";
import Hero from "../Components/Hero";
import About from "../Components/About";
import ExploreDestination from "../Components/ExploreDestination";
import ReviewList from "../Components/Review";
import Bookings from "./Bookings";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <div className="mt-16">
        <Hero />
      </div>
      <About />
      <ExploreDestination value={3} />
      <ReviewList />
      <Bookings value1={5} value2={9} />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
