import Link from 'next/link';
import { TbView360Number } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
              Tracker<TbView360Number className="inline-block mt-1 align-middle text-[#89C60E]" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Track your routine, improve your health.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-[#3F8A00] text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-[#3F8A00] text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-[#3F8A00] text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300 dark:border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Tracker-360. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
