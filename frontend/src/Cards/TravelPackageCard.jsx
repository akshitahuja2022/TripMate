import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({
  image,
  destination,
  duration,
  price,
  tripType,
  description,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl">
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl sm:text-2xl font-bold">{destination}</h3>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ✓ Verified Package
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Duration
              </p>
              <p className="font-semibold text-gray-900">{duration}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Price
              </p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                ₹{price}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tripType.map((t, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="w-30 flex gap-3 pt-2">
          <Link
            to="/booking"
            className="flex-1 text-center px-4 py-2 rounded-lg text-white font-medium bg-blue-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
