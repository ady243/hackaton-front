"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/genericComponent/ProgressBar';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/interfaces/interaces';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressType, setProgressType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Prénom</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Nom</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium">Numéro de téléphone</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="border border-gray-300 rounded-md p-2 w-full"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600">
            S&apos;enregistrer
          </button>
        </form>
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