import React from 'react';
import { ShieldCheck, Headset, Wallet, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-rose-600" />,
    title: "Verified Vehicles",
    description: "Every car in our fleet is thoroughly inspected and fully insured for your safety."
  },
  {
    icon: <Headset className="w-8 h-8 text-rose-600" />,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you anywhere."
  },
  {
    icon: <Wallet className="w-8 h-8 text-rose-600" />,
    title: "Best Price Guarantee",
    description: "Enjoy transparent pricing with no hidden charges or unexpected fees."
  },
  {
    icon: <Rocket className="w-8 h-8 text-rose-600" />,
    title: "Instant Booking",
    description: "Book your preferred vehicle within minutes with our seamless online process."
  }
];

const FeaturedCars = () => {
  // 3, 2 , 1 grid e car er details diye design korte hobe
  // Sesh e See More Cars button navigate hobe explore cars page e
  return (
    <section className="py-8 px-6 md:px-12 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-rose-500 uppercase bg-rose-500/10 px-3 py-1 rounded-full">
            Best Cars
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Book Our Best Cars
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl hover:border-rose-500/50 transition-all duration-300"
            >
              <div className="p-3 bg-slate-900/80 w-fit rounded-xl border border-slate-700/50 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div> 

      </div>
    </section>
  );
};

export default FeaturedCars;