"use client";

import React from 'react';
import Link from 'next/link';
import FormBuilder from '@/components/FormBuilder';


export default function Register() {

  const fields = [
    { name: 'name', label: 'Nom d\'utilisateur', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true }, 
    { name: 'password', label: 'Mot de passe', type: 'password', required: true }
  ];
 

  return (
    <>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Inscription</h2>
          <FormBuilder fields={fields} apiEndpoint="https://api.example.com/register" />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link href="/login">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
}