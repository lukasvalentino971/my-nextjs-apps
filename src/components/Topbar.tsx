'use client';

import { User } from '@/types/auth';
import { useState, MouseEvent } from 'react';
import Link from 'next/link';

interface TopbarProps {
  user: User;
  logout: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Topbar({ user, logout }: TopbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout(e);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-semibold text-gray-900">
              Dashboard
            </Link>
          </div>

          {/* User profile and logout */}
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}