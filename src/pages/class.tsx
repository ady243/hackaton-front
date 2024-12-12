import React from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from '@tanstack/react-table';
import { Class } from '@/interfaces/interaces';

const data: Class[] = [
  {
    id: 1,
    fields_id: 101,
    name: 'Classe A',
  },
  {
    id: 2,
    fields_id: 102,
    name: 'Classe B',
  },
  {
    id: 3,
    fields_id: 103,
    name: 'Classe C',
  },
  {
    id: 4,
    fields_id: 104,
    name: 'Classe D',
  },
  {
    id: 5,
    fields_id: 105,
    name: 'Classe E',
  },
];

const columns: ColumnDef<Class>[] = [
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
    header: "Nom de la classe",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "fields_id",
    header: "ID du champ",
    cell: ({ row }) => <div>{row.getValue("fields_id")}</div>,
  },
];

function ClassPage() {
  const actions = (row: Class) => (
    <div className="flex space-x-2">
      <Button  className = 'bg-green-500 text-white' variant="outline" size="sm">Modifier</Button>
      <Button  className = 'bg-red-400 text-white' variant="outline" size="sm">Supprimer</Button>
    </div>
  );

  return <GenericTable data={data} columns={columns} actions={actions} />;
}

export default ClassPage;