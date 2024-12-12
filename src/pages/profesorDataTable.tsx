import GenericTable from '@/components/genericComponent/GenericTable';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown } from 'lucide-react';

const data = [
  {
    id: "m5gr84i9",
    name: 'Ken',
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: 'Abe',
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: 'Monserrat',
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: 'Silas',
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: 'Carmella',
    email: "carmella@hotmail.com",
  },
];

const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
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
    cell: ({ row }: { row: any }) => (
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
    header: ({ column }: { column: any }) => (
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
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: any }) => (
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
    cell: ({ row }: { row: any }) => <div className="text-left lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }: { row: any }) => (
      <div className="flex justify-center space-x-2">
        <Button className="bg-green-500 text-white" variant="outline" size="sm">Modifier</Button>
        <Button className="bg-red-400 text-white" variant="outline" size="sm">Supprimer</Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

function ProfesorDataTablePage() {
  return <GenericTable data={data} columns={columns} filterColumn="email" />;
}

export default ProfesorDataTablePage;