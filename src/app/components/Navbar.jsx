"use client"

import { authClient } from '@/lib/auth-client';
import { Avatar, Button, Dropdown, DropdownTrigger, Label } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const {
    data: session,
    // isPending,
  } = authClient.useSession()

  const user = session?.user

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
              {/* home button */}
              <li><Link href="/" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/" ? "border-white" : "border-transparent"}`}>Home</Link></li>
              {/* explore cars button */}
              <li><Link href="/explore-cars" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/explore-cars" ? "border-white" : "border-transparent"}`}>Explore Cars</Link></li>
              {/* my bookings button */}
              <li><Link href="/my-bookings" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/my-bookings" ? "border-white" : "border-transparent"}`}>My Bookings</Link></li>
              {/* add car button */}
              <li><Link href="/add-car" className={`hover:text-yellow-200 transition-colors py-2 border-b-2 ${pathname === "/add-car" ? "border-white" : "border-transparent"}`}>Add Car</Link></li>
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
              {/* dropdown */}

              <Dropdown>
                {/* trigger */}
                <DropdownTrigger>
                  <Avatar>
                    <Avatar.Image referrerPolicy='no-referrer' alt={user.name} src={user?.image || user?.imageUrl} />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </DropdownTrigger>
                <Dropdown.Popover className={'bg-gray-950'}>
                  <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                    <Dropdown.Item id="new-file" textValue="New file">
                      <Link href={'/add-car'}>
                        <Label className='text-yellow-500 font-bold'>Add Car</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="copy-link" textValue="Copy link">
                      <Link href={'/my-added-cars'}>
                        <Label className='text-yellow-500 font-bold'>My Added Cars</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="edit-file" textValue="Edit file">
                      <Link href={'/my-bookings'}>
                        <Label className='text-yellow-500 font-bold'>My Bookings</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
                      <Button onClick={handleLogOut} variant='ghost' className={'rounded-lg text-lg text-red-500 font-extrabold'}>Logout</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

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
          {/* home button */}
          <li><Link href="/" className={`block py-2 ${pathname === "/" ? "border-b-3 border-yellow-400" : ""}`}>Home</Link></li>
          {/* explore cars button */}
          <li><Link href="/explore-cars" className={`block py-2 ${pathname === "/explore-cars" ? "border-b-3 border-yellow-400" : ""}`}>Explore Cars</Link></li>
          {/* my bookings button */}
          <li><Link href="/my-bookings" className={`block py-2 ${pathname === "/my-bookings" ? "border-b-3 border-yellow-400" : ""}`}>My Bookings</Link></li>
          {/* add car button */}
          <li><Link href="/add-car" className={`block py-2 ${pathname === "/add-car" ? "border-b-3 border-yellow-400" : ""}`}>Add Car</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;