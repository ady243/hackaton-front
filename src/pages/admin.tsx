/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ChatBubble from '@/components/ChatBubble';
import FormBuilder from '@/components/genericComponent/FormBuilder';
import ProgressBar from '@/components/genericComponent/ProgressBar';
import TabBar from '@/components/genericComponent/TabBar';
import baseUrl from '@/config/baseUrl';
import { FormField } from '@/interfaces/interaces';
import { useEffect, useState } from 'react';
import { AiOutlineRobot } from 'react-icons/ai';

function AdminPage() {
  const [showChat, setShowChat] = useState(false);
  const [yearsGroupOptions, setYearsGroupOptions] = useState([]);
  const [professorOptions, setProfessorOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const [progressType, setProgressType] = useState<'success' | 'error'>('success');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchYearsGroups = async () => {
      try {
        const response = await fetch(`${baseUrl}/years_groups`);
        if (response.ok) {
          const data = await response.json();
          const options = data.map((group: { id: number; name: string }) => ({
            value: group.id,
            label: group.name,
          }));
          setYearsGroupOptions(options);
          console.log('Years Group Options:', options);
        } else {
          console.error('Failed to fetch years groups');
        }
      } catch (error) {
        console.error('Error fetching years groups:', error);
      }
    };

    const fetchProfessors = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/teachers`);
        if (response.ok) {
          const data = await response.json();
          const options = data.map((user: { id: number; first_name: string; last_name: string }) => ({
            value: user.id,
            label: `${user.first_name}`,
          }));
          setProfessorOptions(options);
          setProfessors(data);
          console.log('Professor Options:', options);
        } else {
          console.error('Failed to fetch professors');
        }
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${baseUrl}/subjects/`);
        if (response.ok) {
          const data = await response.json();
          const options = data.map((course: { id: number; name: string }) => ({
            value: course.id,
            label: course.name,
          }));
          setCourseOptions(options);
          setCourses(data);
          console.log('Course Options:', options);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await fetch(`${baseUrl}/classes`);
        if (response.ok) {
          const data = await response.json();
          const options = data.map((classItem: { id: number; name: string }) => ({
            value: classItem.id,
            label: classItem.name,
          }));
          setClassOptions(options);
          setClasses(data);
          console.log('Class Options:', options);
        } else {
          console.error('Failed to fetch classes');
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchYearsGroups();
    fetchProfessors();
    fetchCourses();
    fetchClasses();
  }, [token]);

  const handleSuccess = (message: string) => {
    setProgressMessage(message);
    setProgressType('success');
  };

  const handleError = (message: string) => {
    setProgressMessage(message);
    setProgressType('error');
  };

  const sendCsvFields: FormField[] = [
    {
      name: 'years_group_id',
      label: 'Promotion',
      type: 'select',
      options: yearsGroupOptions,
      required: true,
      placeholder: 'Sélectionnez une promotion',
    },
    { name: 'csv', label: 'Fichier CSV', type: 'file', required: true, placeholder: 'Choisissez un fichier CSV' },
  ];

  const createProfessorFields: FormField[] = [
    { name: 'first_name', label: 'Prénom du professeur', type: 'text', required: true, placeholder: 'Entrez le prénom du professeur' },
    { name: 'last_name', label: 'Nom du professeur', type: 'text', required: true, placeholder: 'Entrez le nom du professeur' },
    { name: 'email', label: 'Email du professeur', type: 'email', required: true, placeholder: 'Entrez l\'email du professeur' },
  ];

  const createClassFields: FormField[] = [
    { name: 'name', label: 'Nom de la classe', type: 'text', required: true, placeholder: 'Entrez le nom de la classe' },
    { name: 'number_students', label: 'Nombre de places', type: 'number', required: true, placeholder: 'Entrez le nombre de places' },
    {
      name: 'years_group_id',
      label: 'Promotion',
      type: 'select',
      options: yearsGroupOptions,
      required: true,
      placeholder: 'Sélectionnez une promotion',
    },
  ];

  const createSubjectFields: FormField[] = [
    { name: 'name', label: 'Nom de matière', type: 'text', required: true, placeholder: 'Entrez le nom de la matière' },
    { name: 'hourly_volume', label: 'Volume horaire', type: 'number', required: true, placeholder: 'Entrez le volume horaire' },
    { name: 'session_duration', label: 'Durée de session (h)', type: 'number', required: true, placeholder: 'Entrez la durée de session' },
    { name: 'start_at', label: 'Date de début', type: 'date', required: true, placeholder: 'Sélectionnez la date de début' },
    { name: 'end_at', label: 'Date de fin', type: 'date', required: true, placeholder: 'Sélectionnez la date de fin' },
  ];

  const assignCourseFields: FormField[] = [
    {
      name: 'users_id',
      label: 'Nom du professeur',
      type: 'select',
      options: professorOptions,
      required: true,
      placeholder: 'Sélectionnez un professeur',
    },
    {
      name: 'subjects_id',
      label: 'Nom du cours',
      type: 'select',
      options: courseOptions,
      required: true,
      placeholder: 'Sélectionnez un cours',
    },
    {
      name: 'classes_id',
      label: 'Nom de la classe',
      type: 'select',
      options: classOptions,
      required: true,
      placeholder: 'Sélectionnez une classe',
    },
    { name: 'url_online', 
      label: 'Cours en ligne',
      type: 'text', 
      required: false,
       placeholder: 'Entrez l\'URL du cours en ligne (optionnel)'
      },
  ];

  const promotioCranCreateFields: FormField[] = [
    { name: 'name', label: 'Nom de la promotion', type: 'text', required: true, placeholder: 'Entrez le nom de la promotion' },
  ];

  const tabs = [
    {
      name: 'Créer un professeur',
      content: (
        <FormBuilder
          fields={createProfessorFields}
          apiEndpoint={`${baseUrl}/users/invitation/send`}
          buttonText="Envoyer l'invitation"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ),
    },
    {
      name: 'Créer une promotion',
      content: (
        <FormBuilder
          fields={promotioCranCreateFields}
          apiEndpoint={`${baseUrl}/years_groups/create`}
          buttonText="Créer une promotion"
          onSuccess={handleSuccess}
          onError={handleError}
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
          onSuccess={handleSuccess}
          onError={handleError}
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
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ),
    },
    {
      name: 'Attribuer un cours au prof',
      content: (
        <FormBuilder
          fields={assignCourseFields}
          apiEndpoint={`${baseUrl}/assignments-subjects/`}
          buttonText="Attribuer"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ),
    },
    {
      name: 'Envoyer un fichier CSV',
      content: (
        <FormBuilder
          fields={sendCsvFields}
          apiEndpoint={`${baseUrl}/educational_courses/import`}
          buttonText="Envoyer le fichier"
          onSubmit={async (formData) => {
            const yearsGroupId = formData.years_group_id;
            const formDataToSend = new FormData();
            formDataToSend.append('csv', formData.csv);

            try {
              const response = await fetch(`${baseUrl}/educational_courses/import/${yearsGroupId}`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
              });

              if (response.ok) {
                handleSuccess('Fichier CSV envoyé avec succès');
              } else {
                const error = await response.json();
                handleError('Une erreur est survenue lors de l\'envoi du fichier CSV.');
                console.error('Erreur lors de l\'envoi du fichier CSV:', error);
              }
            } catch (error) {
              handleError('Impossible de se connecter au serveur.');
              console.error('Erreur réseau:', error);
            }
          }}
          onError={handleError}
        />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg">
        {progressMessage && <ProgressBar message={progressMessage} type={progressType} />}
        <TabBar position="left-68" tabs={tabs} />
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