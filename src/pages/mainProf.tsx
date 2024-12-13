import TabBar from '@/components/genericComponent/TabBar';
import React from 'react';
import ProffesorPageAdmin from './prof';
import SubjectsAttributedPage from './subjectsAttributedPage';
import ListOfSubject from './listOfSubject';


const MainPage = () => {
  const tabs = [
    { name: 'Ajouter Disponibilités', content: <ProffesorPageAdmin /> },
    {name:'Mes matières', content: <ListOfSubject/>},
    { name: 'Mon planing de cours', content: <SubjectsAttributedPage /> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} position="left-96" /> 
    </div>
  );
};

export default MainPage;