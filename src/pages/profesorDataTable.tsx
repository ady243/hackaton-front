/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import GenericTable from "@/components/genericComponent/GenericTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import baseUrl from "@/config/baseUrl";
import apiService from "@/lib/apiService";
import Popup from "@/components/genericComponent/Popup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@/components/ui";

const columns = (userRole: string, handleDeleteClick: (professor: any) => void) => [
  {
    accessorKey: "name",
    header: ({ column }: { column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false } }) => (
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
    cell: ({ row }: { row: { getValue: (columnId: string) => string } }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: { toggleSorting: (desc: boolean) => void; getIsSorted: () => string | false } }) => (
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
    cell: ({ row }: { row: { getValue: (columnId: string) => string } }) => <div>{row.getValue("email")}</div>,
  },
  ...(userRole.toLowerCase() === "admin"
    ? [
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }: { row: any }) => (
            <div className="flex space-x-2 justify-center">
              <Button
                className="bg-red-400 text-white"
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(row.original)}
              >
                Supprimer
              </Button>
            </div>
          ),
        },
      ]
    : []),
];

function ProfesorDataTablePage() {
  const [data, setData] = useState<{ id: number; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { user, token } = currentUser();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      setLoading(true);
      try {
        const result = await apiService.fetchWithAuth(`${baseUrl}/users/teachers`, {}, token);
        const formattedData = result.map((professor: { id: number; first_name: string; last_name: string; email: string }) => ({
          id: professor.id,
          name: `${professor.first_name} ${professor.last_name}`,
          email: professor.email,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching professors:", error);
        toast.error("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      await apiService.fetchWithAuth(`${baseUrl}/users/teachers/${id}`, { method: "DELETE" }, token);
      setData(data.filter((professor) => professor.id !== id));
      toast.success("Professeur supprimé avec succès !");
    } catch (error) {
      console.error("Error deleting professor:", error);
      toast.error("Erreur lors de la suppression du professeur, ce prof a déjà une matière assignée.");
    }
  };

  if (!user) {
    return <Spinner size="50px" />;
  }

  const handleDeleteClick = (professor: any) => {
    setSelectedProfessor(professor);
    setShowDeletePopup(true);
  };

  return (
    <div className="relative">
      <ToastContainer />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <Spinner size="50px" />
        </div>
      )}
      <GenericTable data={data} columns={columns(user.role, handleDeleteClick)} filterColumn="email" />
      {showDeletePopup && selectedProfessor && (
        <Popup
          title="Confirmer la suppression"
          message={`Êtes-vous sûr de vouloir supprimer ${selectedProfessor.name} ?`}
          onConfirm={() => {
            handleDelete(selectedProfessor.id);
            setShowDeletePopup(false);
          }}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
}

export default ProfesorDataTablePage;
