import React from "react";
import { assets } from "../assets/assets";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AiFillClockCircle } from "react-icons/ai";
import { ImHome } from "react-icons/im";

const About = () => {
  return (
    <div className="w-full bg-white mt-20 px-4 sm:px-6 lg:px-8 py-1 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex-col grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div>
            <div className="mb-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Experience The{" "}
                <span className="text-blue-600"> New Adventure</span>
              </h1>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
              Discover unforgettable journeys with like-minded travelers.
              Whether you’re exploring hidden destinations or visiting iconic
              landmarks, TripMate helps you find the perfect companion for your
              next adventure. Plan smarter, travel better, and make memories
              that last forever.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white">
                    <AiFillClockCircle size="1.6rem" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Safe Traveling
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Travel with confidence. Every user on TripMate is verified,
                    ensuring a safe and secure travel experience. Connect only
                    with trusted companions and explore worry-free.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 mt-3">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white">
                    <RiMoneyRupeeCircleFill size="1.8rem" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Affordable Price
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Plan your trips without breaking the bank. Our built-in
                    budget management tools help you split expenses, track
                    spending, and enjoy cost-efficient travel experiences
                    together.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 mt-3">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 text-white">
                    <ImHome size="1.3rem" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Comfort Accommodation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    From cozy homestays to luxury hotels — TripMate helps you
                    organize your stays and transport in one place. Spend less
                    time planning and more time exploring.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={assets.about3}
                alt="Adventure"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Smaller Images Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={assets.about2}
                  alt="Travel 1"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={assets.about4}
                  alt="Travel 2"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={assets.about1}
                  alt="Travel 3"
                  className="w-full h-24 sm:h-28 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
