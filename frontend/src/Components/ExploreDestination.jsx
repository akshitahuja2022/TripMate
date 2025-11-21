import React from "react";
import { Link } from "react-router-dom";
import { destinationData } from "../Data/DestinationData";
import DestinationCard from "../Cards/DestinationCard";

const ExploreDestination = ({ value }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationData.slice(0, value).map((d, i) => (
            <DestinationCard key={i} {...d} />
          ))}
        </div>

        <div className="m-auto text-center mt-10">
          <Link
            to="/destination"
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 font-medium shadow-md hover:shadow-lg"
          >
            Watch More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreDestination;
