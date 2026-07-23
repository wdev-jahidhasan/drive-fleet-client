import React from 'react';
import { ShieldCheck, Headset, Wallet, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import CarCard from './CarCard';
import Image from 'next/image';
import { div } from 'framer-motion/client';

const AvailableCars = async () => {
  const res = await fetch('http://localhost:8000/available')
  const cars = await res.json()
  // console.log(cars);



  return (
    <section className="py-8 px-6 md:px-12 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-rose-500 uppercase bg-rose-500/10 px-3 py-1 rounded-full">
            Available Cars
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Book Our Available Cars
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            cars.map(car => <div key={car._id} className="max-w-sm bg-slate-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-yellow-600 hover:border-yellow-200 group">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  alt={car.model}
                  src={car.imageUrl}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price Badge */}
                <span className="absolute top-3 right-3 bg-[#8a0e37] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {car.price} TK
                  <span className="text-xs font-normal ml-0.5">/day</span>
                </span>
                {/* Availability badge */}
                <span className="absolute top-3 left-3 bg-[#8a0e37] backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  {car.status}
                </span>
              </div>

              <div className="p-5">
                {/* brand model and type */}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-extrabold text-yellow-400">
                    {car.company} <span className="text-white">{car.model}</span>
                  </h3>
                  <span className=" bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {car.carType}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-slate-400 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {car.location}
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 text-sm text-slate-300 border-t border-slate-700 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#8a0e37]">⚡</span>
                    <span className="capitalize">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#8a0e37]">⛽</span>
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#8a0e37]">👥</span>
                    <span>{car.capacity} seats</span>
                  </div>
                </div>

                {/* Button */}

                <Link href={`/explore-cars/${car._id}`}>
                  <button className="mt-4 w-full bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#8a0e37]/30 flex items-center justify-center gap-2">
                    Details
                  </button>
                </Link>
              </div>
            </div>)
          }
          
        </div>

          <div className="mt-12 flex justify-center items-center">
            <Link href="/explore-cars">
              <button className="bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.98] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#8a0e37]/30 flex items-center justify-center gap-2 text-base">
                See All Cars
              </button>
            </Link>
          </div>
          
      </div>
    </section>
  );
};

export default AvailableCars;