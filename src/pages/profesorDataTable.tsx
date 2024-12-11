import GenericTable from '@/components/GenericTable';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ArrowUpDown } from 'lucide-react';

const data = [
  {
    id: "m5gr84i9",
    name: 'Ken',
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: 'Abe',
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: 'Monserrat',
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: 'Silas',
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: 'Carmella',
    status: "processing",
    email: "carmella@hotmail.com",
  },
];

const columns = [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }: { row: any }) => (
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status");
      let colorClass = "";

      switch (status) {
        case "success":
          colorClass = "text-green-600";
          break;
        case "processing":
          colorClass = "text-yellow-600";
          break;
        case "failed":
          colorClass = "text-red-600";
          break;
        case "pending":
          colorClass = "text-blue-600";
          break;
        default:
          colorClass = "text-gray-600";
      }

      return <div className={`capitalize ${colorClass}`}>{status}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",  
    header: () => <div className="text-right">Nom</div>,
  },
];  

function ProfesorDataTablePage() {
  const actions = (row: any) => (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">Edit</Button>
      <Button variant="outline" size="sm">Delete</Button>
    </div>
  );

  return <GenericTable data={data} columns={columns} filterColumn="email" actions={actions} />;
}

export default ProfesorDataTablePage;