import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown } from 'lucide-react';
import baseUrl from '@/config/baseUrl';
import { useAuth } from '@/context/AuthContext';

const columns = (userRole: string) => [
  {
    id: "select",
    header: ({ table }: { table: { getIsAllPageRowsSelected: () => boolean; getIsSomePageRowsSelected: () => boolean; toggleAllPageRowsSelected: (value: boolean) => void; }; }) => (
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
    cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (value: boolean) => void; getValue: (columnId: string) => string; }; }) => (
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
    accessorKey: "name",
    header: ({ column }: { column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false; }; }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }: { row: { getValue: (columnId: string) => string } }) => <div className="text-left">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false; }; }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }: { row: { getValue: (columnId: string) => string } }) => <div className="text-left lowercase">{row.getValue("email")}</div>,
  },
  ...(userRole.toLowerCase() === 'admin' ? [{
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => (
      userRole.toLowerCase() === 'admin' ? (
        <div className="flex justify-center space-x-2">
          <Button className="bg-yellow-500 text-white" variant="outline" size="sm">Modifier</Button>
          <Button className="bg-red-400 text-white" variant="outline" size="sm">Supprimer</Button>
        </div>
      ) : null
    ),
    enableSorting: false,
    enableHiding: false,
  }] : []),
];

function ProfesorDataTablePage() {
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const { user, token } = currentUser();

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/teachers`);
        if (response.ok) {
          const result = await response.json();
          const formattedData = result.map((professor: { id: number; first_name: string; last_name: string; email: string }) => ({
            id: professor.id,
            name: `${professor.first_name} ${professor.last_name}`,
            email: professor.email,
          }));
          setData(formattedData);
        } else {
          console.error('Failed to fetch professors');
        }
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchProfessors();
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <GenericTable data={data} columns={columns(user.role)} filterColumn="email" />;
}

export default ProfesorDataTablePage;