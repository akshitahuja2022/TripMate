import React from "react";
import { Link } from "react-router-dom";
import { destinationData } from "../Data/DestinationData";
import DestinationCard from "../Cards/DestinationCard";

const ExploreDestination = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationData.map((d, i) => (
            <DestinationCard key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreDestination;
