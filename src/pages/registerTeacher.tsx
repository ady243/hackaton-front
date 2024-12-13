"use client";

import FormBuilder from '@/components/genericComponent/FormBuilder';
import ProgressBar from '@/components/genericComponent/ProgressBar';
import baseUrl from '@/config/baseUrl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface InvitationData {
  first_name: string;
  last_name: string;
  email: string;
}

export default function RegisterTeacher() {
  const router = useRouter();
  const { security } = router.query;
  const { token } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressType, setProgressType] = useState<'success' | 'error'>('success');
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/invitation/accept/${security}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data: InvitationData = await response.json();
          setInvitationData(data);
        } else {
          throw new Error('Invalid or expired token.');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setErrorMessage('Le lien est invalide ou expiré.');
      }
    };

    if (security) {
      verifyToken();
    }
  }, [security, token, router]);

  const fields = [
    {
      name: 'first_name',
      label: 'Prénom',
      type: 'text',
      value: invitationData?.first_name || '',
      disabled: true,
    },
    {
      name: 'last_name',
      label: 'Nom',
      type: 'text',
      value: invitationData?.last_name || '',
      disabled: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: invitationData?.email || '',
      disabled: true,
    },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
    { name: 'phone_number', label: 'Numéro de téléphone', type: 'text', required: true },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      setIsRegistering(true);
      const response = await fetch(`${baseUrl}/users/register-by-invitation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { ...formData }, token: security }),
      });

      if (response.ok) {
        setProgressMessage('Inscription réussie, redirection en cours...');
        setProgressType('success');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const errorDetail = await response.json();
        throw new Error(errorDetail?.detail || 'Échec de l’inscription.');
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
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Finalisation de l'inscription</h2>
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <FormBuilder fields={fields} onSubmit={handleSubmit} buttonText="S'enregistrer" />
        )}
      </div>
    </div>
  );
}