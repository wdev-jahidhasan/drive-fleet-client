import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { BookingCancelAlert } from "../components/BookingCancelAlert";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // if (!user) {
  //   return (
  //     <div className="max-w-5xl mx-auto p-6 text-center text-red-500 font-semibold">
  //       Please log in to view your bookings.
  //     </div>
  //   );
  // }

  const res = await fetch(`http://localhost:8000/booking/${user?.id}`, {
    cache: "no-store",
  });
  const bookings = await res.json();

  return (
    <div className="bg-slate-800">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="text-center py-12 text-red-400 text-2xl font-bold rounded-xl">
            No bookings found
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 rounded-2xl shadow-sm border border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center p-4 gap-6"
              >
                {/* image */}
                <div className="relative h-40 w-full sm:w-60 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.model}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 240px"
                  />
                </div>

                {/* content */}
                <div className="flex-1 w-full flex flex-col justify-between h-full space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-yellow-300">
                        {booking.model}
                      </h2>
                      <p className="text-xs text-white">
                        Booked by: <span className="font-medium text-yellow-300">{booking.username}</span>
                      </p>
                    </div>

                    {/* cancel button */}

                    <BookingCancelAlert bookingId ={booking._id}></BookingCancelAlert>
                  </div>

                  <hr className="border-slate-700" />

                  {/* details row */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-white">
                    <div>
                      <span className="text-xs text-gray-400 block">Date</span>
                      <span className="font-semibold">{booking.date}</span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 block">Driver Included</span>
                      <span
                        className={`inline-block font-semibold capitalize ${
                          booking.driver === "yes" ? "text-green-400" : "text-amber-400"
                        }`}
                      >
                        {booking.driver}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 block">Total Price</span>
                      <span className="font-bold text-yellow-300">${booking.price}</span>
                    </div>
                  </div>

                  {/* note */}
                  {booking.note && (
                    <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                      <span className="text-xs font-semibold text-gray-400 block">
                        Note: <span className="font-normal text-gray-300 italic">{booking.note}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;