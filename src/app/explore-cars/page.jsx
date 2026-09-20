'use client';
import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (type) queryParams.append('type', type);
    queryParams.append('page', page);
    queryParams.append('limit', 9);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars?${queryParams.toString()}`, {
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data.cars || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search, type, page]);

  return (
    <div className='bg-slate-800 min-h-screen w-full'>
      <div className='max-w-7xl mx-auto p-4 w-full'>
        <h1 className='text-4xl font-bold text-white pb-4'>All Cars</h1>

        {/* Search and Filter UI */}
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-md mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:flex-1">
            <input
              type="text"
              placeholder="Search by car model or company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-teal-700 transition-colors"
            />
          </div>

          <div className="w-full sm:w-64">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-teal-800 transition-colors cursor-pointer"
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

        {/* Cars Grid with fixed minimum height to prevent UI breaking on last page */}
        {loading ? (
          <div className="min-h-[850px] w-full flex flex-col items-center justify-center col-span-full">
            <div className="relative flex items-center justify-center">
              {/* Outer Glowing Ring */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-teal-500/20 border-t-teal-400 rounded-full animate-spin"></div>
              {/* Inner Spinner */}
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 border-4 border-cyan-500/20 border-b-cyan-400 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-300 font-medium mt-4 text-sm sm:text-base tracking-wider animate-pulse">
              Loading cars...
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[850px] content-start'>
            {cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car}></CarCard>)
            ) : (
              <p className="text-white col-span-full text-center py-10 text-lg">No cars found!</p>
            )}
          </div>
        )}

        {/* Pagination UI */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 pb-10">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-4 py-2 rounded-xl transition cursor-pointer ${page === pageNumber
                    ? 'bg-teal-950 text-white font-bold border border-teal-800'
                    : 'bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-700'
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCars;