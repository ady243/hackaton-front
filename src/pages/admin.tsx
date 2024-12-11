import FormBuilder from '@/components/FormBuilder';
import React from 'react';

const fields = [
  { name: 'number', label: 'Nombre', type: 'number' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'startTime', label: 'Heure de début', type: 'time' },
  { name: 'endTime', label: 'Heure de fin', type: 'time' },
  { name: 'select', label: 'Sélection', type: 'select', options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]},
  { name: 'textarea', label: 'Texte long', type: 'textarea' },
];

function AdminPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg ">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Page d'administration</h2>
        <FormBuilder fields={fields} apiEndpoint="https://api.planify.com/admin" />
      </div>
    </div>
  );
}

export default AdminPage;