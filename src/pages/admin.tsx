
"use client";
import FormBuilder from '@/components/FormBuilder';
import TabBar from '@/components/TabBar';
import React from 'react';

const createProfessorFields = [
    { name: 'name', label: 'Nom du professeur', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },

];

const createClassFields = [
    { name: 'className', label: 'Nom de la classe', type: 'text' },
    { name: 'capacity', label: 'Nombre de places', type: 'number' },
];
const createCourseFields = [
  { name: 'className', label: 'Nom de la classe', type: 'text' },
  { name: 'fieldName', label: 'Nom du champ', type: 'text' },
  { name: 'subjectName', label: 'Nom du sujet', type: 'text' },
  { name: 'hourlyVolume', label: 'Volume horaire', type: 'number' },
  { name: 'startAt', label: 'Date de début', type: 'date' },
  { name: 'endAt', label: 'Date de fin', type: 'date' },
];

const assignCourseFields = [
    {name:'name', label: 'Nom du professeur', type: 'select', options: [
        { value: 'professor1', label: 'Professeur 1' },
        { value: 'professor2', label: 'Professeur 2' },
        { value: 'professor3', label: 'Professeur 3' },
    ]},
    {name:'course', label: 'Nom du cours', type: 'select', options: [
        { value: 'cours1', label: 'Cours 1' },
        { value: 'cours2', label: 'Cours 2' },
        { value: 'cours3', label: 'Cours 3' },
    ]},
  { name: 'startDate', label: 'Date de début', type: 'date' },
  { name: 'endDate', label: 'Date de fin', type: 'date' },
];

function AdminPage() {
    
  const tabs = [
    {
        name: 'Créer une classe',
        content: <FormBuilder fields={createClassFields} apiEndpoint="https://api.planify.com/delete-course"buttonText="Créer une classe" />,
    },
    {
        name:'Créer un professeur',
        content: <FormBuilder fields={createProfessorFields} apiEndpoint="https://api.planify.com/delete-course" buttonText="Envoyer l'invitation" />,

    },
    {
      name: 'Créer un cours',
      content: <FormBuilder fields={createCourseFields} apiEndpoint="https://api.planify.com/create-course" buttonText="Créer un cours" />,
    },
    {
      name: 'Attribuer un cours au prof',
      content: <FormBuilder fields={assignCourseFields} apiEndpoint="https://api.planify.com/assign-course" buttonText="Attribuer un cours au prof" />,
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg">
        <TabBar tabs={tabs} />
      </div>
    </div>
  );
}

export default AdminPage;