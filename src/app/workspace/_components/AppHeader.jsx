'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image';
import { Search } from 'lucide-react';
import Link from 'next/link';

const navOptions = [
  { name: "Dashboard", path: "/workspace" },
  { name: "My Learning", path: "/workspace/my-courses" },
  { name: "Explore Courses", path: "/workspace/explore" },
  { name: "AI Tools", path: "/workspace/ai-tools" },
  { name: "Billing", path: "/workspace/billing" },
  { name: "Profile", path: "/workspace/profile" },
];

function AppHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full px-6 py-3 border-b flex items-center justify-between bg-white shadow-sm relative z-50">
      <div className="flex items-center gap-2">
        <Image src="/logo1.svg" alt="Logo" width={40} height={40} />
        <span className="text-xl font-semibold text-orange-500">BuildingBlocks</span>
      </div>

      <div className="relative mx-6 max-w-md w-full" ref={dropdownRef}>
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-left"
          >
            <span className="text-gray-500">Search dashboard, tools, or profile...</span>
            <Search className="ml-2 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border shadow-md rounded-md overflow-hidden z-50">
              {navOptions.map((option) => (
                <Link
                  key={option.name}
                  href={option.path}
                  className="block px-4 py-2 hover:bg-orange-100 text-sm"
                  onClick={() => setShowDropdown(false)}
                >
                  {option.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <UserButton />
    </header>
  );
}

export default AppHeader;
