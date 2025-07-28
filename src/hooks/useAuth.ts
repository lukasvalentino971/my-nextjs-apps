import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { authApi, getToken, removeToken } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.getProfile();
        setUser(response.data.user);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        removeToken();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      setUser(null);
      window.location.href = '/login';
    }
  };

  return {
    user,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
  };
};