import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PopularCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/available`, {
    cache: 'no-store'
  })
  const cars = await res.json()

  return (
    <section className="py-12 px-6 md:px-12 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full">
            Popular Cars
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-white">
            Book Our Popular Cars
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            cars.map(car => <div key={car._id} className="max-w-sm bg-[#103448] rounded-3xl shadow-xl overflow-hidden border border-yellow-600 hover:border-yellow-300 transition-all duration-300 group">
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <Image
                  alt={car.model}
                  src={car.imageUrl}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price Badge */}
                <span className="absolute top-3 right-3 bg-[#8a0e37] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                  {car.price} TK
                  <span className="text-xs font-semibold ml-0.5">/day</span>
                </span>
                {/* Availability badge */}
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-slate-200 border border-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                  {car.status}
                </span>
              </div>

              <div className="p-6">
                {/* brand model and type */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-extrabold text-white">
                    {car.company} <span className="text-amber-400">{car.model}</span>
                  </h3>
                  <span className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {car.carType}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-slate-200 font-medium mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{car.location}</span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-slate-200 font-semibold border-t border-slate-700 pt-4 mb-4">
                  <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl flex items-center gap-1.5 justify-center">
                    <span>⚡</span>
                    <span className="capitalize">{car.transmission}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl flex items-center gap-1.5 justify-center">
                    <span>⛽</span>
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 p-2 rounded-xl flex items-center gap-1.5 justify-center">
                    <span>👥</span>
                    <span>{car.capacity} seats</span>
                  </div>
                </div>

                {/* Button */}
                <Link href={`/explore-cars/${car._id}`}>
                  <button className="w-full bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#8a0e37]/20 flex items-center justify-center gap-2 text-sm cursor-pointer">
                    Details
                  </button>
                </Link>
              </div>
            </div>)
          }
        </div>

        <div className="mt-12 flex justify-center items-center">
          <Link href="/explore-cars">
            <button className="bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.99] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-[#8a0e37]/20 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
              See All Cars
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularCars;