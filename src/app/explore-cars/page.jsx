import React from 'react';
import CarCard from '../components/CarCard';

const ExploreCars = async () => {
  const res = await fetch('http://localhost:8000/cars')
  const cars = await res.json()

  console.log(cars);
  return (
    <div>
      <h1 className='text-4xl font-bold'>All Cars</h1>

      <div>
        {
          cars.map(car => <CarCard key={car._id} car={car}></CarCard>)
        }
      </div>

    </div>
  );
};

export default ExploreCars;