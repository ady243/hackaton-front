import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { ColumnDef } from '@tanstack/react-table';
import baseUrl from '@/config/baseUrl';
import { Assignment } from '@/interfaces/interaces';
import { useAuth } from '@/context/AuthContext';

const ListOfSubject: React.FC = () => {
  const [data, setData] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = user?.role.toLowerCase() === 'teacher'
          ? `${baseUrl}/assignments-subjects/${user.id}`
          : `${baseUrl}/assignments-subjects/`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Data received:', result);
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/assignments-subjects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setData(data.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete assignment');
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit assignment with ID: ${id}`);
  };

  const columns: ColumnDef<Assignment>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'class_info.name',
      header: 'Classe',
    },
    {
      accessorKey: 'subject_info.name',
      header: 'Matière',
    },
    {
      accessorKey: 'user_info.first_name',
      header: 'Professeur',
      cell: ({ row }) => `${row.original.user_info.first_name} ${row.original.user_info.last_name}`,
    },
    {
      accessorKey: 'url_online',
      header: 'URL en ligne',
    },
    {
      accessorKey: 'subject_info.start_at',
      header: 'Date de début',
    },
    {
      accessorKey: 'subject_info.end_at',
      header: 'Date de fin',
    },
    ...(user?.role.toLowerCase() === 'admin' ? [{
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: Assignment } }) => (
        <div className="flex justify-center space-x-2">
          <Button className="bg-yellow-500 text-white" variant="outline" size="sm" onClick={() => handleEdit(row.original.id)}>Modifier</Button>
          <Button className="bg-red-400 text-white" variant="outline" size="sm" onClick={() => handleDelete(row.original.id)}>Supprimer</Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }] : []),
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-12'>
      <GenericTable data={data} columns={columns} filterPlaceholder="Filtrer par matière..." filterColumn="subject_info.name" />
    </div>
  );
};

export default ListOfSubject;