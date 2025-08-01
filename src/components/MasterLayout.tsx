'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

interface MasterLayoutProps {
  children: ReactNode;
}

export default function MasterLayout({ children }: MasterLayoutProps) {
  const { user, loading, error, logout } = useAuth();

  // Loading state
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  // Error state
  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // No user state
  if (!user) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No User Data</h2>
            <p className="text-gray-600">Unable to load user information.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Main layout
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Topbar user={user} logout={logout} />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}