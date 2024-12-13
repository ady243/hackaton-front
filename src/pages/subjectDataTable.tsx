import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Subject } from '@/interfaces/interaces';
import { ColumnDef } from '@tanstack/react-table';
import { useAuth } from '@/context/AuthContext';
import baseUrl from '@/config/baseUrl';

const columns: ColumnDef<Subject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nom du sujet",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "hourly_volume",
    header: "Volume horaire",
    cell: ({ row }) => <div>{row.getValue("hourly_volume")}</div>,
  },
  {
    accessorKey: "start_at",
    header: "Date de début",
    cell: ({ row }) => <div>{new Date(row.getValue("start_at")).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "end_at",
    header: "Date de fin",
    cell: ({ row }) => <div>{new Date(row.getValue("end_at")).toLocaleDateString()}</div>,
  },
];

function SubjectDataTable() {
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [data, setData] = useState<Subject[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/subjects/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/subjects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setData(data.filter(subject => subject.id !== id));
      } else {
        console.error('Failed to delete subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleEdit = async (id: number, updatedSubject: Partial<Subject>) => {
    try {
      const response = await fetch(`${baseUrl}/subjects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSubject),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setData(data.map(subject => (subject.id === id ? updatedData : subject)));
      } else {
        console.error('Failed to update subject');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const actions = (row: Subject) => (
    <div className="flex space-x-2">
      {user?.role && user.role.toLowerCase() === 'admin' && (
        <>
          <Button
            className='bg-yellow-500 text-white'
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.id, { name: 'Updated Name' })} 
          >
            Modifier
          </Button>
          <Button
            className='bg-red-400 text-white'
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            Supprimer
          </Button>
        </>
      )}
    </div>
  );

  return <GenericTable data={data} columns={columns} actions={actions} />;
}

export default SubjectDataTable;