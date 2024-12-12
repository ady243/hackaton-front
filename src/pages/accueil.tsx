import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdEventNote, MdPerson, MdClass, MdLibraryBooks } from 'react-icons/md';

function AccueilPage() {
  const { currentUser } = useAuth();
  const user = currentUser();

  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
    }
  }, [user]);
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-grow p-8 ">
        <div className="max-w-4xl p-12 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Bienvenue sur Planify</h1>
          <div className='mt-12'>
          <p className="text-lg text-gray-700 mb-4">
            Planify est une application de gestion de planning conçue pour vous aider à organiser vos cours, vos classes et vos professeurs de manière efficace et intuitive.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Avec Planify, vous pouvez :
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
            <li className="flex items-center">
              <MdEventNote className="mr-2 text-blue-600" />
              Créer et gérer des plannings de cours
            </li>
            <li className="flex items-center">
              <FaChalkboardTeacher className="mr-2 text-green-600" />
              Attribuer des cours à des professeurs
            </li>
            <li className="flex items-center">
              <MdPerson className="mr-2 text-purple-600" />
              Gérer les informations des professeurs et des matières
            </li>
            <li className="flex items-center">
              <MdLibraryBooks className="mr-2 text-red-600" />
              Visualiser les plannings sous forme de calendrier
            </li>
            <li className="flex items-center">
              <MdClass className="mr-2 text-yellow-600" />
              Créer et gérer des classes
            </li>

            <li className="flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              Voir les matières qui vous sont attribués en tant que professeur
            </li>
          </ul>
          <p className="text-lg text-gray-700 mb-4">
            Utilisez le menu à gauche pour naviguer entre les différentes sections de l'application. Nous espérons que Planify vous aidera à mieux organiser votre emploi du temps et à gagner en productivité.
          </p>
          <p className="text-lg text-gray-700">
           Bonne utilisation !
          </p>
          </div>
     
        </div>
      </div>
    </div>
  );
}

export default AccueilPage;