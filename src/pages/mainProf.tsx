import TabBar from '@/components/genericComponent/TabBar';
import React from 'react';
import ProffesorPageAdmin from './prof';
import SubjectsAttributedPage from './subjectsAttributedPage';

const MainPage = () => {
  const tabs = [
    { name: 'Ajouter Disponibilités', content: <ProffesorPageAdmin /> },
    { name: 'Matières Attribuées', content: <SubjectsAttributedPage /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} position="left-96" /> 
    </div>
  );
};

export default MainPage;