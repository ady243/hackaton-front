"use client";
import ChatBubble from '@/components/ChatBubble';
import FormBuilder from '@/components/genericComponent/FormBuilder';
import TabBar from '@/components/genericComponent/TabBar';
import baseUrl from '@/config/baseUrl';
import { useEffect, useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai';

function AdminPage() {
  const [showChat, setShowChat] = useState(false);
  const [yearsGroupOptions, setYearsGroupOptions] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log("Token récupéré :", token);

  useEffect(() => {
    const fetchYearsGroups = async () => {
      try {
        const response = await fetch(`${baseUrl}/years_groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const options = data.map((group: { id: number; name: string }) => ({
            value: group.id,
            label: group.name,
          }));
          setYearsGroupOptions(options);
        } else {
          console.error('Failed to fetch years groups');
        }
      } catch (error) {
        console.error('Error fetching years groups:', error);
      }
    };

    fetchYearsGroups();
  }, [token]);

  const sendCsvFields = [
    { name: 'name', label: 'Nom du document', type: 'text' },
    { name: 'csv', label: 'Fichier CSV', type: 'file' },
  ];

  const createProfessorFields = [
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  const createClassFields = [
    { name: 'name', label: 'Nom de la classe', type: 'text', required: true },
    { name: 'number_students', label: 'Nombre de places', type: 'number', required: true },
    {
      name: 'years_group_id',
      label: 'Promotion',
      type: 'select',
      options: yearsGroupOptions,
      required: true,
    },
  ];

  const createSubjectFields = [
    { name: 'name', label: 'Nom de matière', type: 'text', required: true },
    { name: 'hourly_volume', label: 'Volume horaire', type: 'number', required: true },
    { name: 'session_duration', label: 'Durée de session (h)', type: 'number', required: true },
    { name: 'start_at', label: 'Date de début', type: 'date', required: true },
    { name: 'end_at', label: 'Date de fin', type: 'date', required: true },
  ];

  const assignCourseFields = [
    {
      name: 'name',
      label: 'Nom du professeur',
      type: 'select',
      options: [
        { value: 'professor1', label: 'Professeur 1' },
        { value: 'professor2', label: 'Professeur 2' },
        { value: 'professor3', label: 'Professeur 3' },
      ],
    },
    {
      name: 'course',
      label: 'Nom du cours',
      type: 'select',
      options: [
        { value: 'cours1', label: 'Cours 1' },
        { value: 'cours2', label: 'Cours 2' },
        { value: 'cours3', label: 'Cours 3' },
      ],
    },
    { name: 'startDate', label: 'Date de début', type: 'date' },
    { name: 'endDate', label: 'Date de fin', type: 'date' },
  ];

  const tabs = [
    {
      name: 'Créer un professeur',
      content: (
        <FormBuilder
          fields={createProfessorFields}
          apiEndpoint={`${baseUrl}/users/invitation/send`}
          buttonText="Envoyer l'invitation"
          headers={{
            Authorization: `Bearer ${token}`,
          }}
        />
      ),
    },
    {
      name: 'Créer une classe',
      content: (
        <FormBuilder
          fields={createClassFields}
          apiEndpoint={`${baseUrl}/classes/create`}
          buttonText="Créer une classe"
        />
      ),
    },
    {
      name: 'Créer une matière',
      content: (
        <FormBuilder
          fields={createSubjectFields}
          apiEndpoint={`${baseUrl}/subjects`}
          buttonText="Créer une matière"
        />
      ),
    },
    {
      name: 'Attribuer un cours au prof',
      content: (
        <FormBuilder
          fields={assignCourseFields}
          apiEndpoint="https://api.planify.com/assign-course"
          buttonText="Attribuer un cours au prof"
        />
      ),
    },
    {
      name: 'Envoyer un fichier CSV',
      content: (
        <FormBuilder
          fields={sendCsvFields}
          apiEndpoint="https://api.planify.com/send-csv"
          buttonText="Envoyer le fichier"
        />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg">
        <TabBar tabs={tabs} />
        <div className="fixed bottom-4 right-4">
          <button
            className="p-4 bg-indigo-500 text-white rounded-full shadow-lg"
            onClick={() => setShowChat(!showChat)}
          >
            <AiOutlineRobot size={24} />
          </button>
        </div>
        {showChat && (
          <div className="fixed bottom-16 right-4 w-80 p-4 bg-blue-100 rounded-lg shadow-lg">
            <ChatBubble text="Ceci est un message de l'IA." />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
