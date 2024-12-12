"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormBuilder from '@/components/genericComponent/FormBuilder';
import ProgressBar from '@/components/genericComponent/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { FormField, User } from '@/interfaces/interaces';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressType, setProgressType] = useState<'success' | 'error'>('success');

  const fields: FormField[] = [
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
    { name: 'phone_number', label: 'Numéro de téléphone', type: 'text', required: true },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      setIsRegistering(true);
      const userData = {
        ...formData,
        role: 'ADMIN',
      };
      await register(userData as Partial<User>);
      setProgressMessage('Inscription réussie, redirection en cours...');
      setProgressType('success');
      setTimeout(() => {
        router.push('/login');
      }, 2000); 
    } catch (error) {
      console.error('Failed to register:', error);
      setProgressMessage('Échec de l\'inscription, veuillez réessayer.');
      setProgressType('error');
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isRegistering && progressType === 'success' && <ProgressBar message={progressMessage} type={progressType} />}
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