"use client";

import React from 'react';
import Link from 'next/link';
import FormBuilder from '@/components/FormBuilder';
import { useAuth } from '@/context/AuthContext';

const fields = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Mot de passe', type: 'password', required: true },
];

function LoginPage() {
  const { login } = useAuth();

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
     const data = await login(formData.email, formData.password);
      console.log("user data",data);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>
        <FormBuilder fields={fields} onSubmit={handleSubmit} buttonText="Se connecter" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{' '}
            <Link href="/register">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;