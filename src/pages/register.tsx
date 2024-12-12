"use client";

import React from 'react';
import Link from 'next/link';
import FormBuilder from '@/components/FormBuilder';
import { useAuth } from '@/context/AuthContext';
import { PartialUser } from '@/interfaces/interaces';


export default function Register() {
  const { register } = useAuth();

  const fields = [
    { name: 'firstname', label: 'Prénom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      await register(formData as unknown as PartialUser);
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Inscription</h2>
        <FormBuilder fields={fields} onSubmit={handleSubmit} buttonText="S'enregistrer" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link href="/login">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}