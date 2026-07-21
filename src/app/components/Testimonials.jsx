import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Farhana Haque",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "DriveFleet made my business trip hassle-free. The car was spotless and the booking process took less than two minutes!"
  },
  {
    id: 2,
    name: "Rasel Mahmud",
    role: "Family Vacationer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Rented an SUV for a weekend road trip. Customer support was incredibly helpful when we needed to extend our trip duration."
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Daily Commuter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    comment: "Transparent pricing with no hidden charges at all. Highly recommend DriveFleet for anyone looking for reliability."
  }
];

const Testimonials = () => {
  return (
    <section className="py-8 px-6 md:px-12 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-rose-500 uppercase bg-rose-500/10 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* User Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full object-cover border border-rose-500/40"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                  <p className="text-xs text-slate-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;