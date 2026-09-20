"use client";

import { authClient } from '@/lib/auth-client';
import { Avatar, Button, Dropdown, DropdownTrigger, Label } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const {
    data: session,
  } = authClient.useSession();

  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#0d2430] shadow-md sticky top-0 z-50" ref={menuRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Left Side: Mobile Menu Toggle & Desktop Nav Links */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer text-white p-2 md:hidden hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
              <li>
                <Link href="/" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/" ? "border-yellow-400" : "border-transparent"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore-cars" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/explore-cars" ? "border-yellow-400" : "border-transparent"}`}>
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/my-bookings" ? "border-yellow-400" : "border-transparent"}`}>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/add-car" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/add-car" ? "border-yellow-400" : "border-transparent"}`}>
                  Add Car
                </Link>
              </li>
            </ul>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/final-logo.png"
                alt="logo"
                height={160}
                width={160}
                className='brightness-0 invert object-contain'
              />
            </Link>
          </div>

          {/* Right Side: User Profile Dropdown or Login Button */}
          <div className="flex items-center">
            {user ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar className="cursor-pointer ring-2 ring-yellow-400/50 hover:ring-yellow-400 transition-all">
                    <Avatar.Image referrerPolicy='no-referrer' alt={user.name} src={user?.image || user?.imageUrl} />
                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </DropdownTrigger>
                <Dropdown.Popover className={'bg-gray-950 border border-gray-800 shadow-xl rounded-xl p-1'}>
                  <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                    <Dropdown.Item id="new-file" textValue="Add Car">
                      <Link href={'/add-car'}>
                        <Label className='text-yellow-500 font-bold cursor-pointer'>Add Car</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="copy-link" textValue="My Added Cars">
                      <Link href={'/my-added-cars'}>
                        <Label className='text-yellow-500 font-bold cursor-pointer'>My Added Cars</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="edit-file" textValue="My Bookings">
                      <Link href={'/my-bookings'}>
                        <Label className='text-yellow-500 font-bold cursor-pointer'>My Bookings</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="delete-file" textValue="Logout" variant="danger">
                      <Button onClick={handleLogOut} variant='ghost' className={'w-full justify-start rounded-lg text-base text-red-500 font-bold hover:bg-red-500/10'}>
                        Logout
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <Link
                href="/login"
                className="bg-[#8a0e37] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-[#bd2a5b] transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Slide / Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-3/4 sm:w-1/2 bg-[#091722] border-b border-r border-gray-800 shadow-2xl px-6 py-5 rounded-br-2xl transition-all z-50">
          <ul className="flex flex-col gap-3 text-white font-medium text-base">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${pathname === "/" ? "bg-[#132f42] text-yellow-400 font-bold border-l-4 border-yellow-400" : "hover:bg-white/5"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore-cars"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${pathname === "/explore-cars" ? "bg-[#132f42] text-yellow-400 font-bold border-l-4 border-yellow-400" : "hover:bg-white/5"}`}
              >
                Explore Cars
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${pathname === "/my-bookings" ? "bg-[#132f42] text-yellow-400 font-bold border-l-4 border-yellow-400" : "hover:bg-white/5"}`}
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/add-car"
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-lg transition-colors ${pathname === "/add-car" ? "bg-[#132f42] text-yellow-400 font-bold border-l-4 border-yellow-400" : "hover:bg-white/5"}`}
              >
                Add Car
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;