import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { BookingCancelAlert } from "../components/BookingCancelAlert";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const bookings = await res.json();

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header Section */}
        <div className="text-center sm:text-left mb-10 pb-6 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Manage and view your active car rental reservations.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
            <p className="text-rose-400 text-lg font-semibold">No bookings found</p>
            <p className="text-slate-400 text-sm mt-1">You haven't rented any vehicles yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col sm:flex-row items-center p-5 sm:p-6 gap-6 group"
              >
                {/* image */}
                <div className="relative h-44 w-full sm:w-60 flex-shrink-0 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.model}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 240px"
                  />
                </div>

                {/* content */}
                <div className="flex-1 w-full flex flex-col justify-between h-full space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        {booking.model}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Booked by: <span className="font-semibold text-amber-400">{booking.username}</span>
                      </p>
                    </div>

                    {/* cancel button */}
                    <BookingCancelAlert bookingId={booking._id} />
                  </div>

                  <hr className="border-slate-800" />

                  {/* details row */}
                  <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">Date</span>
                      <span className="font-semibold text-slate-200">{booking.date}</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">Driver Included</span>
                      <span
                        className={`inline-block font-semibold capitalize px-2.5 py-0.5 rounded-md text-xs ${booking.driver === "yes"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                      >
                        {booking.driver}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400 block mb-0.5">Total Price</span>
                      <span className="font-bold text-amber-400 text-base">${booking.price}</span>
                    </div>
                  </div>

                  {/* note */}
                  {booking.note && (
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-semibold text-slate-400 block">
                        Note: <span className="font-normal text-slate-300 italic">{booking.note}</span>
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