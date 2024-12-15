import TabBar from '@/components/genericComponent/TabBar';
import React from 'react';
import ProffesorPageAdmin from './prof';
import SubjectsAttributedPage from './subjectsAttributedPage';
import ListOfSubject from './listOfSubject';
import TeacherCsv from './teacherCsv';


const MainPage = () => {
  const tabs = [
    { name: 'Ajouter Disponibilités', content: <ProffesorPageAdmin /> },
    {name:'Mes matières', content: <ListOfSubject/>},
    { name: 'Mon planing de cours', content: <SubjectsAttributedPage /> },
    { name: 'importer un planing ', content: <TeacherCsv/> },
  ];

  return (
    <div>
      <TabBar tabs={tabs} position="left-96" /> 
    </div>
  );
};

export default MainPage;