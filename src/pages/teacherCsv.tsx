import React, { useState } from 'react';
import baseUrl from '@/config/baseUrl';
import Loader from '@/components/Loader';
import { useAuth } from '@/context/AuthContext';

function TeacherCsv() {
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [availabilityText, setAvailabilityText] = useState('');
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleDownloadCsv = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/ai/professor_availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          download_csv: true,
          availability_text: availabilityText,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'professor_availability.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setCsvFile(new File([blob], 'professor_availability.csv', { type: 'text/csv' }));
      } else {
        console.error('Failed to download CSV');
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCsv = async () => {
    if (!csvFile) {
      alert('Veuillez sélectionner un fichier CSV.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', csvFile);

      const response = await fetch(`${baseUrl}/availabilities/import/${user?.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('CSV téléchargé avec succès.');
      } else {
        console.error('Failed to upload CSV');
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">Générer et Importer un planning</h1>
      <p className="text-center">Utilisez l&apos;outil ci-dessous pour générer un fichier CSV de vos disponibilités et l&apos;importer dans notre système.</p>
      
      <div className="w-full max-w-lg">
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          rows={5}
          value={availabilityText}
          onChange={(e) => setAvailabilityText(e.target.value)}
          placeholder="Entrez vos disponibilités ici..."
        />
        <button
          onClick={handleDownloadCsv}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
          disabled={loading}
        >
          {loading ? <Loader /> : 'Télécharger le planning'}
        </button>
      </div>

      <div className="w-full max-w-lg">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files ? e.target.files[0] : null)}
          className="w-full mb-4"
        />
        <button
          onClick={handleUploadCsv}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          disabled={loading}
        >
          {loading ? <Loader /> : 'Importer le planning'}
        </button>
      </div>
    </div>
  );
}

export default TeacherCsv;