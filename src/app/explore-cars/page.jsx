import React from 'react';
import CarCard from '../components/CarCard';
import { div } from 'framer-motion/client';

const ExploreCars = async () => {
  const res = await fetch('http://localhost:8000/cars')
  const cars = await res.json()

  console.log(cars);
  return (
    <div className='bg-slate-800'>
    <div className=' max-w-7xl mx-auto p-4'>
      <h1 className='text-4xl font-bold text-white pb-4'>All Cars</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          cars.map(car => <CarCard key={car._id} car={car}></CarCard>)
        }
      </div>

    </div>
    </div>
  );
};

export default ExploreCars;