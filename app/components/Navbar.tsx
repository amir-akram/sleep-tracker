"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { TbView360Number } from "react-icons/tb";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "text-[#3F8A00] font-semibold px-2 py-1 rounded-md text-sm sm:px-3 sm:py-2 sm:text-base"
      : "text-gray-700 dark:text-gray-300 hover:text-[#3F8A00] px-2 py-1 rounded-md text-sm sm:px-3 sm:py-2 sm:text-base";

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
                Tracker
                <TbView360Number className="mt-1 inline-block align-middle text-[#89C60E]" />
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>

            <Link href="/gym" className={linkClass("/gym")}>
              Gym
            </Link>

            <Link href="/about" className={linkClass("/about")}>
              About
            </Link>

            {/* Auth */}
            <SignedOut>
              <SignInButton>
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] hover:from-[#2E6600] hover:via-[#6EA80B] hover:to-[#C7E87A] text-white sm:px-4 sm:py-2 px-3 py-1 text-sm sm:text-md rounded-md font-medium cursor-pointer transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
