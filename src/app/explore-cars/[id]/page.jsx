import { DeleteDialog } from "@/app/components/DeleteDialog";
import { EditModal } from "@/app/components/EditModal";
import { Button } from "@heroui/react";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CarDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/cars/${id}`);
  const car = await res.json();

  const { capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, status } = car;

  return (
    <div className="bg-slate-900 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto px-3 sm:px-4">
        {/* Back Button */}
        <Link href="/explore-cars">
          <button className="mb-4 sm:mb-6 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Cars
          </button>
        </Link>

        <div className="flex items-center justify-end gap-4 mt-5 mb-3">
          <EditModal car={car}></EditModal>
          <DeleteDialog car={car}></DeleteDialog>
        </div>

        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
          {/* Hero Image */}
          <div className="relative h-[240px] sm:h-[320px] lg:h-[380px] w-full">
            <Image
              alt={`${company} ${model}`}
              src={imageUrl}
              fill
              className="object-cover"
              priority
            />

            {/* Availability badge */}
            <span className="absolute top-3 left-3 bg-[#8a0e37] backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-full">
              {status}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 break-words drop-shadow-md">
                {company} <span className="text-white">{model}</span>
              </h1>
              <div className="flex items-center gap-2 text-slate-300 mt-1 text-sm sm:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="break-words drop-shadow-md">{location}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Badges + Price row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#8a0e37] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {carType}
                </span>
                <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs sm:text-sm">
                  {transmission}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-bold text-yellow-400 leading-tight">{price} TK</p>
                <p className="text-slate-400 text-[10px] sm:text-xs">per day</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Description</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base break-words">{description}</p>
            </div>

            {/* Specs as Compact Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-slate-700/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-slate-400 text-xs">Seats:</span>
                <span className="text-white font-semibold text-sm">{capacity}</span>
              </div>
              <div className="bg-slate-700/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-slate-400 text-xs">Fuel:</span>
                <span className="text-white font-semibold text-sm">{fuelType}</span>
              </div>
              <div className="bg-slate-700/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="text-slate-400 text-xs">Transmission:</span>
                <span className="text-white font-semibold capitalize text-sm">{transmission}</span>
              </div>
            </div>

            {/* CTA */}
            {/* CTA Section */}
            {status?.toLowerCase() === "available" ? (
              <button className="w-full bg-[#8a0e37] hover:bg-[#a01142] text-white font-semibold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#8a0e37]/30 flex items-center justify-center gap-2 text-sm sm:text-base">
                Rent Now
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-slate-700 text-slate-400 font-semibold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Currently Unavailable
              </button>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;