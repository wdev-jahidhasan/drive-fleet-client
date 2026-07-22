import Image from "next/image";
import Link from "next/link";

const CarCard = ({ car }) => {
  const { capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, _id } = car;

  return (
    <div className="max-w-sm bg-[#0d3143] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-yellow-600 hover:border-yellow-200 group">
      <div className="relative h-52 w-full bg-slate-700 overflow-hidden">
        <Image
          alt={model}
          src={imageUrl}
          width={400}
          height={400}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-[#8a0e37] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
          {price} TK
          <span className="text-xs font-normal ml-0.5">/day</span>
        </span>
        {/* Car Type Badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {carType}
        </span>
      </div>

      <div className="p-5">
        {/* Title */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-extrabold text-yellow-400">
            {company} <span className="text-white">{model}</span>
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-slate-400 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2 text-sm text-slate-300 border-t border-slate-700 pt-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8a0e37]">⚡</span>
            <span className="capitalize">{transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8a0e37]">⛽</span>
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8a0e37]">👥</span>
            <span>{capacity} seats</span>
          </div>
        </div>

        {/* Button */}

        <Link href={`/explore-cars/${_id}`}>
        <button className="mt-4 w-full bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#8a0e37]/30 flex items-center justify-center gap-2">
          Rent Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;