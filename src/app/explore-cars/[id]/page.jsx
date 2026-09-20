import BookingForm from "@/app/components/BookingForm";
import { DeleteDialog } from "@/app/components/DeleteDialog";
import { EditModal } from "@/app/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const CarDetails = async ({ params }) => {
  const { id } = await params;

  // server component ------------------------------------------------
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const car = await res.json();

  const { capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, status } = car;

  return (
    <div className="bg-slate-950 min-h-screen py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link href="/explore-cars">
          <button className="mb-6 text-slate-200 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base font-semibold cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Cars
          </button>
        </Link>

        {session && session.user.id === car.userId && (
          <div className="flex items-center justify-end gap-3 mb-5">
            <EditModal car={car}></EditModal>
            <DeleteDialog car={car}></DeleteDialog>
          </div>
        )}

        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
          {/* Hero Image */}
          <div className="relative h-[260px] sm:h-[340px] lg:h-[400px] w-full bg-slate-950">
            <Image
              alt={`${company} ${model}`}
              src={imageUrl}
              fill
              className="object-cover"
              priority
            />

            {/* Availability badge */}
            <span className="absolute top-4 left-4 bg-[#8a0e37] text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-lg">
              {status}
            </span>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight break-words drop-shadow-md">
                {company} <span className="text-amber-400">{model}</span>
              </h1>
              <div className="flex items-center gap-2 text-slate-200 mt-2 text-sm sm:text-base font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="break-words">{location}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-5 sm:p-8">
            {/* Badges + Price row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#8a0e37] text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                  {carType}
                </span>
                <span className="bg-slate-800 text-slate-200 border border-slate-600 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                  {transmission}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 leading-tight">{price} TK</p>
                {/* Contrast increased for per day */}
                <p className="text-slate-200 text-xs mt-0.5 font-semibold">per day</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-2 text-base">Description</h3>
              <p className="text-slate-200 leading-relaxed text-sm sm:text-base break-words">{description}</p>
            </div>

            {/* Specs as Compact Badges - Contrast increased */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-slate-950 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="text-slate-300 text-xs font-semibold">Seats:</span>
                <span className="text-white font-bold text-sm">{capacity}</span>
              </div>
              <div className="bg-slate-950 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="text-slate-300 text-xs font-semibold">Fuel:</span>
                <span className="text-white font-bold text-sm">{fuelType}</span>
              </div>
              <div className="bg-slate-950 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="text-slate-300 text-xs font-semibold">Transmission:</span>
                <span className="text-white font-bold capitalize text-sm">{transmission}</span>
              </div>
            </div>

            {/* booking section --------------------------------------------- */}
            {status?.toLowerCase() === "available" ? (
              <BookingForm car={car}></BookingForm>
            ) : (
              <button
                disabled
                className="w-full bg-slate-950 border border-slate-600 text-slate-300 font-semibold py-3.5 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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