"use client";

import { useState, useEffect } from 'react';
import { LoginScreen } from '@/components/app/login-screen';
import { HabitualHarmonyApp } from '@/components/app/habitual-harmony-app';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('habitual-harmony-username');
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    try {
      localStorage.setItem('habitual-harmony-username', username);
      setUser(username);
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
  };

  const handleLogout = () => {
    try {
      // Also remove user-specific data
      if (user) {
        localStorage.removeItem(`habitual-harmony-user-${user}`);
      }
      localStorage.removeItem('habitual-harmony-username');
      setUser(null);
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4 p-4">
           <Skeleton className="h-48 w-full max-w-sm rounded-lg" />
           <Skeleton className="h-12 w-full max-w-xs" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <HabitualHarmonyApp user={user} onLogout={handleLogout} />;
}
