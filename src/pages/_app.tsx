"use client";

import '../app/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default MyApp;