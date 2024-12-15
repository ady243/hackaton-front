/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, useCallback } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import ChatBubble from "@/components/ChatBubble";
import FormBuilder from "@/components/genericComponent/FormBuilder";
import { FormField } from "@/components/genericComponent/FormBuilder";
import TabBar from "@/components/genericComponent/TabBar";
import apiService from "@/lib/apiService";
import baseUrl from "@/config/baseUrl";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminPage() {
  const [showChat, setShowChat] = useState(false);
  const [yearsGroupOptions, setYearsGroupOptions] = useState([]);
  const [professorOptions, setProfessorOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch data functions
  const fetchYearsGroups = useCallback(async () => {
    try {
      const data = await apiService.fetchWithAuth(`${baseUrl}/years_groups`, {}, token);
      setYearsGroupOptions(
        data.map((group: { id: number; name: string }) => ({ value: group.id, label: group.name }))
      );
    } catch (error) {
      console.error("Error fetching years groups:", error);
    }
  }, [token]);

  const fetchProfessors = useCallback(async () => {
    try {
      const data = await apiService.fetchWithAuth(`${baseUrl}/users/teachers`, {}, token);
      setProfessorOptions(
        data.map((prof: { id: number; first_name: string; last_name: string }) => ({
          value: prof.id,
          label: `${prof.first_name} ${prof.last_name}`,
        }))
      );
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  }, [token]);

  const fetchCourses = useCallback(async () => {
    try {
      const data = await apiService.fetchWithAuth(`${baseUrl}/subjects/`, {}, token);
      setCourseOptions(
        data.map((course: { id: number; name: string }) => ({ value: course.id, label: course.name }))
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, [token]);

  const fetchClasses = useCallback(async () => {
    try {
      const data = await apiService.fetchWithAuth(`${baseUrl}/classes`, {}, token);
      setClassOptions(
        data.map((classItem: { id: number; name: string }) => ({ value: classItem.id, label: classItem.name }))
      );
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchYearsGroups();
      fetchProfessors();
      fetchCourses();
      fetchClasses();
    }
  }, [token, fetchYearsGroups, fetchProfessors, fetchCourses, fetchClasses]);

  const notifySuccess = (message: string) => toast.success(message, { position: "top-right", autoClose: 3000 });
  const notifyError = (message: string) => toast.error(message, { position: "top-right", autoClose: 3000 });

  const createProfessorFields: FormField[] = [
    {
      name: "first_name",
      label: "Prénom",
      type: "text",
      required: true,
      placeholder: "Entrez le prénom",
      validation: (value: string) => (value.length < 2 ? "Le prénom doit contenir au moins 2 caractères" : null),
    },
    {
      name: "last_name",
      label: "Nom",
      type: "text",
      required: true,
      placeholder: "Entrez le nom",
      validation: (value: string) => (value.length < 2 ? "Le nom doit contenir au moins 2 caractères" : null),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Entrez l'email",
      validation: (value: string) => (!/\S+@\S+\.\S+/.test(value) ? "L'email est invalide" : null),
    },
  ];

  const createClassFields: FormField[] = [
    {
      name: "name",
      label: "Nom de la classe",
      type: "text",
      required: true,
      placeholder: "Entrez le nom de la classe",
      validation: (value: string) => (value.length < 3 ? "Le nom de la classe doit contenir au moins 3 caractères" : null),
    },
    {
      name: "number_students",
      label: "Nombre d'étudiants",
      type: "number",
      required: true,
      placeholder: "Entrez le nombre d'étudiants",
      validation: (value: number) => (value <= 0 ? "Le nombre d'étudiants doit être supérieur à 0" : null),
    },
    {
      name: "years_group_id",
      label: "Promotion",
      type: "select",
      options: yearsGroupOptions,
      required: true,
      placeholder: "Sélectionnez une promotion",
    },
  ];


  const createSubjectFields: FormField[] = [
    {
      name: "name",
      label: "Nom de la matière",
      type: "text",
      required: true,
      placeholder: "Entrez le nom de la matière",
      validation: (value: string) => (value.length < 3 ? "Le nom de la matière doit contenir au moins 3 caractères" : null),
    },
    {
      name: "hourly_volume",
      label: "Volume horaire",
      type: "number",
      required: true,
      placeholder: "Entrez le volume horaire",
      validation: (value: number) => (value <= 0 ? "Le volume horaire doit être supérieur à 0" : null),
    },
    {
      name: "session_duration",
      label: "Durée de session (h)",
      type: "number",
      required: true,
      placeholder: "Entrez la durée de la session",
    },
    {
      name: "start_at",
      label: "Date de début",
      type: "date",
      required: true,
      validation: (value, formData) => {
        const endDate = formData ? formData["end_at"] : null;
        if (endDate && new Date(value) >= new Date(endDate)) {
          return "La date de début doit être inférieure à la date de fin.";
        }
        return null;
      },
    },
    {
      name: "end_at",
      label: "Date de fin",
      type: "date",
      required: true,
      validation: (value, formData) => {
        const startDate = formData ? formData["start_at"] : null;
        if (startDate && new Date(value) <= new Date(startDate)) {
          return "La date de fin doit être supérieure à la date de début.";
        }
        return null;
      },
    },
  ];

  const sendCsvFields: FormField[] = [
    {
      name: "years_group_id",
      label: "Promotion",
      type: "select",
      options: yearsGroupOptions,
      required: true,
      placeholder: "Sélectionnez une promotion",
    },
    {
      name: "csv",
      label: "Fichier CSV",
      type: "file",
      required: true,
    },
  ];

  const assignCourseFields: FormField[] = [
    {
      name: "users_id",
      label: "Nom du professeur",
      type: "select",
      options: professorOptions,
      required: true,
      placeholder: "Sélectionnez un professeur",
    },
    {
      name: "subjects_id",
      label: "Nom du cours",
      type: "select",
      options: courseOptions,
      required: true,
      placeholder: "Sélectionnez un cours",
    },
    {
      name: "classes_id",
      label: "Nom de la classe",
      type: "select",
      options: classOptions,
      required: true,
      placeholder: "Sélectionnez une classe",
    },
  ];

  const tabs = [
    {
      name: "Créer un professeur",
      content: (
        <FormBuilder
          title="Création d'un professeur"
          description="Utilisez ce formulaire pour ajouter un nouveau professeur."
          fields={createProfessorFields}
          apiEndpoint={`${baseUrl}/users/invitation/send`}
          buttonText="Créer le professeur"
          onSuccess={() => {
            notifySuccess("Professeur créé avec succès !");
            fetchProfessors();
          }}
          onError={() => notifyError("Erreur lors de la création du professeur.")}
        />
      ),
    },
    {
      name: "Créer une classe",
      content: (
        <FormBuilder
          title="Création d'une classe"
          description="Remplissez les informations pour créer une nouvelle classe."
          fields={createClassFields}
          apiEndpoint={`${baseUrl}/classes/create`}
          buttonText="Créer la classe"
          onSuccess={() => {
            notifySuccess("Classe créée avec succès !");
            fetchClasses();
          }}
          onError={() => notifyError("Erreur lors de la création de la classe.")}
        />
      ),
    },
    {
      name: "Créer une matière",
      content: (
        <FormBuilder
          title="Création d'une matière"
          description="Remplissez les informations pour créer une nouvelle matière."
          fields={createSubjectFields}
          apiEndpoint={`${baseUrl}/subjects`}
          buttonText="Créer la matière"
          onSuccess={() => {
            notifySuccess("Matière créée avec succès !");
            fetchCourses();
          }}
          onError={() => notifyError("Erreur lors de la création de la matière.")}
        />
      ),
    },
    {
      name: "Importer un calendrier pédagogique",
      content: (
        <FormBuilder
          title="Importation via CSV"
          description="Téléchargez le calendrier pédagogiques en csv, les champs qui sont requis day, day_type exemple : 2021-09-01 examen, 2021-09-02 cours"
          fields={sendCsvFields}
          onSubmit={async (formData) => {
            const yearsGroupId = formData.get("years_group_id") as string; 
            const csvFile = formData.get("csv") as File; 
    
            if (!yearsGroupId) {
              notifyError("Veuillez sélectionner une promotion.");
              return;
            }
    
            if (!csvFile) {
              notifyError("Veuillez importer un fichier CSV.");
              return;
            }
    
            try {
              const formDataToSend = new FormData();
              formDataToSend.append("file", csvFile);
    
              await apiService.postFormDataWithAuth(
                `${baseUrl}/educational_courses/import/${yearsGroupId}`,
                formDataToSend,
                token
              );
    
              notifySuccess("Fichier CSV importé avec succès !");
              fetchYearsGroups(); 
            } catch (error) {
              console.error("Erreur lors de l'importation du fichier CSV:", error);
              notifyError("Erreur lors de l'importation du fichier CSV.");
            }
          }}
          buttonText="Envoyer le fichier"
          onError={() => notifyError("Erreur lors de l'importation du fichier CSV.")}
        />
      ),
    },
    
    
    {
      name: "Attribuer un cours",
      content: (
        <FormBuilder
          title="Attribuer un cours"
          description="Associez un professeur, un cours et une classe."
          fields={assignCourseFields}
          apiEndpoint={`${baseUrl}/assignments-subjects/`}
          buttonText="Attribuer"
          onSuccess={() => {
            notifySuccess("Cours attribué avec succès !");
            fetchCourses();
          }}
          onError={() => notifyError("Erreur lors de l'attribution du cours.")}
        />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg">
        <TabBar position="left-68" tabs={tabs} />
        <div className="fixed bottom-4 right-4">
          <button
            className="p-4 bg-indigo-500 text-white rounded-full shadow-lg"
            onClick={() => setShowChat(!showChat)}
          >
            <AiOutlineRobot size={24} />
          </button>
          <ToastContainer />
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
