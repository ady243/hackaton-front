import React, { useEffect, useState } from 'react';
import GenericTable from '@/components/genericComponent/GenericTable';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from '@tanstack/react-table';
import { Class } from '@/interfaces/interaces';
import { useAuth } from '@/context/AuthContext';
import baseUrl from '@/config/baseUrl';
import Popup from '@/components/genericComponent/Popup';

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
    accessorKey: "number_students",
    header: "Nombre d'étudiants",
    cell: ({ row }) => <div>{row.getValue("number_students")}</div>,
  },
  {
    accessorKey: "years_group_id",
    header: "ID du groupe d'années",
    cell: ({ row }) => <div>{row.getValue("years_group_id")}</div>,
  },
];

function ClassPage() {
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [data, setData] = useState<Class[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Class>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/classes/`, {
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
      const response = await fetch(`${baseUrl}/classes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setData(data.filter(classItem => classItem.id !== id));
      } else {
        console.error('Failed to delete class');
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleEdit = async (id: number, updatedClass: Partial<Class>) => {
    console.log('Updated class data:', updatedClass); // Ajoutez cette ligne pour vérifier les données mises à jour
    try {
      const response = await fetch(`${baseUrl}/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedClass),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setData(data.map(classItem => (classItem.id === id ? updatedData : classItem)));
      } else {
        console.error('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const actions = (row: Class) => (
    <div className="flex space-x-2">
      {user?.role && user.role.toLowerCase() === 'admin' && (
        <>
          <Button
            className='bg-yellow-500 text-white'
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedClass(row);
              setEditFormData({ name: row.name });
              setShowEditPopup(true);
            }}
          >
            Modifier
          </Button>
          <Button
            className='bg-red-400 text-white'
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedClass(row);
              setShowDeletePopup(true);
            }}
          >
            Supprimer
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div>
      <GenericTable data={data} columns={columns} actions={actions} />
      {showDeletePopup && selectedClass && (
        <Popup
          title="Confirmer la suppression"
          message={`Êtes-vous sûr de vouloir supprimer la classe ${selectedClass.name} ?`}
          onConfirm={() => {
            handleDelete(selectedClass.id);
            setShowDeletePopup(false);
          }}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
      {showEditPopup && selectedClass && (
        <Popup
          title="Modifier la classe"
          onConfirm={() => {
            handleEdit(selectedClass.id, editFormData);
            setShowEditPopup(false);
          }}
          onCancel={() => setShowEditPopup(false)}
        >
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom de la classe
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={editFormData.name ?? ''}
                onChange={handleEditFormChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </form>
        </Popup>
      )}
    </div>
  );
}

export default ClassPage;