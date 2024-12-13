import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown } from 'lucide-react';
import { Column, ColumnDef, Row, Table } from '@tanstack/react-table';
import { SessionCourse } from '@/interfaces/interaces';
import baseUrl from '@/config/baseUrl';
import { useAuth } from '@/context/AuthContext';

function SubjectsAttributedPage() {
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [data, setData] = useState<SessionCourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/sessions-subjects/`, {
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

  const handleStatusChange = async (id: number, status: 'CONFIRMED' | 'REFUSED') => {
    try {
      const response = await fetch(`${baseUrl}/sessions-subjects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setData(data.map(item => item.id === id ? { ...item, status } : item));
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns: ColumnDef<SessionCourse>[] = [
    {
      id: "select",
      header: ({ table }: { table: Table<SessionCourse> }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Sélectionner tout"
          />
        </div>
      ),
      cell: ({ row }: { row: Row<SessionCourse> }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Sélectionner la ligne"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "assignment_info.subject_info.name",
      header: ({ column }: { column: Column<SessionCourse> }) => (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cours
            <ArrowUpDown className="ml-2" />
          </Button>
        </div>
      ),
      cell: ({ row }: { row: Row<SessionCourse> }) => <div className="text-left">{row.original.assignment_info.subject_info.name}</div>,
    },
    {
      accessorKey: "start_at",
      header: ({ column }: { column: Column<SessionCourse> }) => (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Début
            <ArrowUpDown className="ml-2" />
          </Button>
        </div>
      ),
      cell: ({ row }: { row: Row<SessionCourse> }) => <div className="text-left">{new Date(row.original.start_at).toLocaleString()}</div>,
    },
    {
      accessorKey: "end_at",
      header: ({ column }: { column: Column<SessionCourse> }) => (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fin
            <ArrowUpDown className="ml-2" />
          </Button>
        </div>
      ),
      cell: ({ row }: { row: Row<SessionCourse> }) => <div className="text-left">{new Date(row.original.end_at).toLocaleString()}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }: { column: Column<SessionCourse> }) => (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Statut
            <ArrowUpDown className="ml-2" />
          </Button>
        </div>
      ),
      cell: ({ row }: { row: Row<SessionCourse> }) => {
        const statusMap: { [key: string]: string } = {
          PENDING: 'En attente',
          REFUSED: 'Refusé',
          CONFIRMED: 'Confirmé',
        };
        return <div className="text-left">{statusMap[row.original.status]}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }: { row: Row<SessionCourse> }) => (
        user && user.role.toLowerCase() === 'teacher' ? (
          <div className="flex justify-center space-x-2">
            <Button className="bg-yellow-500 text-white" variant="outline" size="sm" onClick={() => handleStatusChange(row.original.id, 'CONFIRMED')}>Accepter</Button>
            <Button className="bg-red-400 text-white" variant="outline" size="sm" onClick={() => handleStatusChange(row.original.id, 'REFUSED')}>Refuser</Button>
          </div>
        ) : null
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-12'>
      <GenericTable data={data} columns={columns} filterColumn="assignment_info.subject_info.name" />
    </div>
  );
}

export default SubjectsAttributedPage;