import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdEventNote, MdPerson } from 'react-icons/md';

function AccueilPage() {
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user, token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-grow p-8 ">
        <div className="max-w-4xl p-12 bg-white rounded-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Bienvenue {user?.first_name} sur Planify </h1>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccueilPage;