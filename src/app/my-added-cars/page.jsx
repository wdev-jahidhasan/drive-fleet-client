import { auth } from '@/lib/auth';
import AddedCarCard from '../components/CarCard';
import { headers } from 'next/headers';
import { div } from 'framer-motion/client';
const MyAddedCars = async () => {


  const session = await auth.api.getSession({
    headers: await headers()
  })

  const userId = session.user.id;
  console.log("Passing userId to MyAddedCars:", userId);

  const res = await fetch(`http://localhost:8000/cars/user/${userId}`,
    {
      cache: 'no-store',
    }
  )
  const cars = await res.json()

  console.log(cars);

  if (!cars || cars.length === 0) {
    return (
      <div className="bg-slate-800 text-center text-red-400 py-12">
        <p className="text-2xl font-bold">You haven't added any car!</p>
      </div>
    );
  }

  return (
    <div className='bg-slate-800'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
        {
          cars.map(car =>
            <AddedCarCard key={car._id} car={car} userId={userId}></AddedCarCard>
          )
        }
      </div>
    </div>
  );
};

export default MyAddedCars;