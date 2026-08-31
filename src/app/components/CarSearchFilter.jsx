'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

const CarSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');

  const handleFilterChange = (newSearch, newType) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSearch) {
      params.set('search', newSearch);
    } else {
      params.delete('search');
    }

    if (newType) {
      params.set('type', newType);
    } else {
      params.delete('type');
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/60 backdrop-blur-md mb-8 flex flex-col sm:flex-row items-center gap-4">
      {/* Search Input */}
      <div className="w-full sm:flex-1">
        <input
          type="text"
          placeholder="Search by car name..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            handleFilterChange(value, type);
          }}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Type Filter Select */}
      <div className="w-full sm:w-64">
        <select
          value={type}
          onChange={(e) => {
            const value = e.target.value;
            setType(value);
            handleFilterChange(search, value);
          }}
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
  );
};

export default CarSearchFilter;