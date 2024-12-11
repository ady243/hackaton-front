import React from 'react';
import GenericTable from '@/components/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Subject } from '@/interfaces/interaces';
import { ColumnDef } from '@tanstack/react-table';


const data: Subject[] = [
  {
    id: 1,
    name: 'Mathématiques',
    hourly_volume: 40,
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-06-01'),
  },
  {
    id: 2,
    name: 'Physique',
    hourly_volume: 35,
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-06-01'),
  },
  {
    id: 3,
    name: 'Chimie',
    hourly_volume: 30,
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-06-01'),
  },
  {
    id: 4,
    name: 'Biologie',
    hourly_volume: 25,
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-06-01'),
  },
  {
    id: 5,
    name: 'Informatique',
    hourly_volume: 45,
    start_at: new Date('2024-01-01'),
    end_at: new Date('2024-06-01'),
  },
];

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
    cell: ({ row }) => <div>{(row.getValue("start_at") as Date).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "end_at",
    header: "Date de fin",
    cell: ({ row }) => <div>{(row.getValue("end_at") as Date).toLocaleDateString()}</div>,
  },
];

function SubjectDataTable() {
  const actions = (row: Subject) => (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">Modifier </Button>
      <Button variant="outline" size="sm"> Supprimer</Button>
    </div>
  );

  return <GenericTable data={data} columns={columns} actions={actions} />;
}

export default SubjectDataTable;