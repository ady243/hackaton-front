import React, { useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { ColumnDef } from '@tanstack/react-table';
import { SessionCourse } from '@/interfaces/interaces';


const data: SessionCourse[] = [
  {
    id: 1,
    classrooms_id: 101,
    statuts: 'PENDING',
    assignments_courses_id: 201,
    comment: 'Cours de mathématiques',
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-01-01'),
  },
  {
    id: 2,
    classrooms_id: 102,
    statuts: 'PENDING',
    assignments_courses_id: 202,
    comment: 'Cours de physique',
    start_at: new Date('2024-01-02'),
    end_at: new Date('2024-01-02'),
  },
];

const columns: ColumnDef<SessionCourse>[] = [
  {
    accessorKey: 'classrooms_id',
    header: 'ID de la classe',
    cell: ({ row }) => <div>{row.getValue('classrooms_id')}</div>,
  },
  {
    accessorKey: 'comment',
    header: 'Commentaire',
    cell: ({ row }) => <div>{row.getValue('comment')}</div>,
  },
  {
    accessorKey: 'start_at',
    header: 'Date de début',
    cell: ({ row }) => <div>{(row.getValue('start_at') as Date).toLocaleString()}</div>,
  },
  {
    accessorKey: 'end_at',
    header: 'Date de fin',
    cell: ({ row }) => <div>{(row.getValue('end_at') as Date).toLocaleString()}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue<string>('status');
      let colorClass = '';

      switch (status) {
        case 'CONFIRMED':
          colorClass = 'text-green-600';
          break;
        case 'REFUSED':
          colorClass = 'text-red-600';
          break;
        case 'PENDING':
          colorClass = 'text-yellow-600';
          break;
        default:
          colorClass = 'text-gray-600';
      }

      return <div className={`capitalize ${colorClass}`}>{status}</div>;
    },
  },
];

function ProffesorPageAdmin() {
  const [courses, setCourses] = useState(data);

  const handleStatusChange = (id: number, newStatus: 'PENDING' | 'REFUSED' | 'CONFIRMED') => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, status: newStatus } : course
      )
    );
  };

  const actions = (row: SessionCourse) => (
    <div className="flex space-x-2">
      <Button className='bg-green-500 text-white' variant="outline" size="sm" onClick={() => handleStatusChange(row.id, 'CONFIRMED')}>
        Accepter
      </Button>
      <Button className='bg-red-400 text-white' variant="outline" size="sm" onClick={() => handleStatusChange(row.id, 'REFUSED')}>
        Refuser
      </Button>
    </div>
  );

  return (
   <div className='mt-16'>
    <h1 className='text-2xl text-center top-24 mr-8'>Mes cours attribués</h1>
    <GenericTable data={courses} columns={columns} actions={actions} />;
   </div>

  )

}

export default ProffesorPageAdmin;