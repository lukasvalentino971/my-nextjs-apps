'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@/types/auth';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '📦' },
    { name: 'Profile', href: '/profile', icon: '👤' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1> {/* Tambahkan text-gray-900 di sini */}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg text-gray-900 ${
                  pathname === item.href ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}