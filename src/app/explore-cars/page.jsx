'use client';
import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (type) queryParams.append('type', type);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars?${queryParams.toString()}`, {
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search, type]);

  return (
    <div className='bg-slate-800 min-h-screen'>
      <div className='max-w-7xl mx-auto p-4'>
        <h1 className='text-4xl font-bold text-white pb-4'>All Cars</h1>

        {/* Search and Filter UI */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-md mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:flex-1">
            <input
              type="text"
              placeholder="Search by car model or company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="text-white text-center py-20 text-xl">Loading cars...</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car}></CarCard>)
            ) : (
              <p className="text-white col-span-full text-center py-10 text-lg">No cars found!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;