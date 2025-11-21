import { Link } from "react-router-dom";

const DestinationCard = ({
  image,
  name,
  location,
  rating = 4.5,
  tags = [],
  description = "",
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 sm:h-64 md:h-56 lg:h-64 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24  from-black/60 to-transparent rounded-b-2xl"></div>
        <div className="absolute left-4 bottom-4 text-white">
          <h3 className="text-lg sm:text-xl font-semibold leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-200">{location}</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: fullStars }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.175 0l-3.389 2.46c-.784.57-1.839-.196-1.54-1.118l1.287-3.973a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
              ))}
              {halfStar && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.922-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-.587-.196V2.927z" />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="flex items-center gap-3 mt-1">
          <Link
            to="/package"
            className="text-sm text-gray-700 px-3 py-2 border bg-blue-100 border-gray-200 rounded-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
