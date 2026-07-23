"use client"

import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

  const {
    data: session,
    // isPending,
  } = authClient.useSession()

  console.log(session);

  const user = session?.user

  console.log(user);

  const handleLogOut = async () => {
    await authClient.signOut();
  }

  return (
    <nav className="bg-[#0d2430] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <label htmlFor="menu-toggle" className="cursor-pointer text-white p-2 md:hidden">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              </svg>
            </label>

            <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
              <li><Link href="/" className=" hover:text-yellow-200 transition-colors">Home</Link></li>
              <li><Link href="/explore-cars" className="hover:text-yellow-200 transition-colors">Explore Cars</Link></li>
              <li><Link href="/my-bookings" className="hover:text-yellow-200 transition-colors">My Bookings</Link></li>
              <li><Link href="/add-car" className="hover:text-yellow-200 transition-colors">Add Car</Link></li>
            </ul>
          </div>

          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/final-logo.png"
                alt="logo"
                height={200}
                width={200}
                className='brightness-0 invert'
              />
            </Link>
          </div>

          {/* conditional login button or user avatar */}

          {user ?
            <>
              <div className="flex items-center gap-3">
                <div>
                  <Avatar>
                    <Avatar.Image alt="John Doe" src={user?.imageUrl} />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </div>
                <Button onClick={handleLogOut} variant='danger' className={'rounded-lg'}>Logout</Button>
              </div>
            </>
            :
            <>
              <div className="flex items-center">
                <Link
                  href="/login"
                  className="bg-[#8a0e37] text-white px-3 py-1.5 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-lg hover:bg-[#bd2a5b] transition-all shadow-sm"
                >
                  Login
                </Link>
              </div>
            </>
          }

        </div>
      </div>

      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      <div className="hidden peer-checked:block md:hidden bg-gray-400 border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg w-[40%]">
        <ul className="flex flex-col gap-2 text-[#be154e] font-semibold text-sm">
          <li><Link href="/" className="block py-2 border-b border-gray-50">Home</Link></li>
          <li><Link href="/explore-cars" className="block py-2 border-b border-gray-50">Explore Cars</Link></li>
          <li><Link href="/my-bookings" className="block py-2 border-b border-gray-50">My Bookings</Link></li>
          <li><Link href="/add-car" className="block py-2">Add Car</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;