"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProgressBar from '@/components/genericComponent/ProgressBar';
import baseUrl from '@/config/baseUrl';
import { InvitationData } from '@/interfaces/interaces';

export default function RegisterTeacher() {
  const router = useRouter();
  const { security } = router.query;
  const [isRegistering, setIsRegistering] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressType, setProgressType] = useState<'success' | 'error'>('success');
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    phone_number: '',
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log('Security token:', security); 
        const response = await fetch(`${baseUrl}/users/invitation/accept/${security}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data: InvitationData = await response.json();
          console.log('Invitation Data:', data); 
          setInvitationData(data);
        } else {
          const errorDetail = await response.json();
          console.error('Error Detail:', errorDetail); 
          setErrorMessage('Le lien est invalide ou expiré.');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setErrorMessage('Le lien est invalide ou expiré.');
      }
    };

    if (security) {
      verifyToken();
    }
  }, [security, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = {
      ...formData,
      first_name: invitationData?.first_name || '',
      last_name: invitationData?.last_name || '',
      email: invitationData?.email || '',
    };
    console.log('Form Data:', formDataObj); 
    try {
      const response = await fetch(`${baseUrl}/users/register-by-invitation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: formDataObj, token: security }),
      });

      if (response.ok) {
        setProgressMessage('Inscription réussie, redirection en cours...');
        setProgressType('success');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorDetail = await response.json();
        console.error('Error Detail:', errorDetail);
        setErrorMessage(errorDetail?.detail || 'Échec de l’inscription.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setProgressMessage("Échec de l'inscription, veuillez réessayer.");
      setProgressType('error');
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isRegistering && progressType === 'success' && (
        <ProgressBar message={progressMessage} type={progressType} />
      )}
      <div className="w-full max-w-md p-8 space-y-6 ">
        <h2 className="text-2xl font-bold text-center">Finalisation de l&apos;inscription</h2>
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          invitationData && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium">Prénom</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={invitationData.first_name}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium">Nom</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={invitationData.last_name}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={invitationData.email}
                  disabled
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
          )
        )}
      </div>
    </div>
  );
}