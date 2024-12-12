import React from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown } from 'lucide-react';

const data = [
  {
    id: "1",
    subject: 'Mathématiques',
    professor: "Ken",
  },
  {
    id: "2",
    subject: 'Physique',
    professor: "Abe",
  },
  {
    id: "3",
    subject: 'Chimie',
    professor: "Monserrat",
  },
  {
    id: "4",
    subject: 'Biologie',
    professor: "Silas",
  },
  {
    id: "5",
    subject: 'Informatique',
    professor: "Carmella",
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
    accessorKey: "subject",
    header: ({ column }: { column: any }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Matière
          <ArrowUpDown className="ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "professor",
    header: ({ column }: { column: any }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Professeur
          <ArrowUpDown className="ml-2" />
        </Button>
      </div>
    ),
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("professor")}</div>,
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

function SubjectsAttributedPage() {
  return (
    <div className='mt-12'>
      <GenericTable data={data} columns={columns} filterColumn="subject" />
    </div>
  );
}

export default SubjectsAttributedPage;