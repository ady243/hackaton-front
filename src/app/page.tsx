"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!token && currentPath !== '/registerTeacher') {
      router.push('/login');
    } else if (token) {
      router.push('/accueil');
    }
  }, [router, token]);

  return null;
}