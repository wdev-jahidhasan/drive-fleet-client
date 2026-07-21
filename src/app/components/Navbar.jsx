import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='shadow-sm'>
      <div className='max-w-7xl mx-auto p-3'>
      <div className='flex justify-between items-center'>

        <ul className='flex gap-5 text-teal-500 font-semibold'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/explore-cars'}>Explore Cars</Link>
          </li>
          <li>
            <Link href={'/my-bookings'}>My Bookings</Link>
          </li>
          <li>
            <Link href={'/add-car'}>Add Car</Link>
          </li>
          
        </ul>

        <Image
          src={'/images/logo.png'}
          alt='logo'
          height={200}
          width={200}
        >
        </Image>

      <ul className='text-teal-500 font-semibold'>
        <li>
          <Link href={'/login'}>Login/SignUp</Link>
        </li>
      </ul>

      </div>
      </div>
    </nav>
  );
};

export default Navbar;