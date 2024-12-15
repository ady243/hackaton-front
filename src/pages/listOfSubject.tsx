/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import GenericTable from "@/components/genericComponent/GenericTable";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "@/config/baseUrl";
import apiService from "@/lib/apiService";
import { Assignment } from "@/interfaces/interaces";
import { useAuth } from "@/context/AuthContext";
import Popup from "@/components/genericComponent/Popup";

const ListOfSubject: React.FC = () => {
  const [data, setData] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const { user, token } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        user?.role.toLowerCase() === "teacher"
          ? `${baseUrl}/assignments-subjects/teacher/${user.id}`
          : `${baseUrl}/assignments-subjects/`;
      const result = await apiService.fetchWithAuth(url, {}, token);
      setData(result);
    } catch (error) {
      toast.error("Error fetching assignments. Please try again.");
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!selectedAssignment) return;

    try {
      await apiService.fetchWithAuth(
        `${baseUrl}/assignments-subjects/${selectedAssignment.id}`,
        { method: "DELETE" },
        token
      );
      toast.success("Assignation de matière supprimée avec success.");
      setData((prev) => prev.filter((item) => item.id !== selectedAssignment.id));
      setShowDeletePopup(false);
      setSelectedAssignment(null);
    } catch (error) {
      toast.error("Erreur lors de la suppresion de l'assignatation.");
      console.error("Error deleting assignment:", error);
    }
  };

  const confirmDelete = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDeletePopup(true);
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "class_info.name", header: "Classe" },
    { accessorKey: "subject_info.name", header: "Matière" },
    {
      accessorKey: "user_info.first_name",
      header: "Professeur",
      cell: ({ row }: { row: { original: Assignment } }) =>
        `${row.original.user_info.first_name} ${row.original.user_info.last_name}`,
    },
    { accessorKey: "url_online", header: "URL en ligne" },
    { accessorKey: "subject_info.start_at", header: "Date de début" },
    { accessorKey: "subject_info.end_at", header: "Date de fin" },
    ...(user?.role.toLowerCase() === "admin"
      ? [
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }: { row: { original: Assignment } }) => (
              <div className="flex justify-center space-x-2">
                <Button
                  className="bg-red-400 text-white"
                  variant="outline"
                  size="sm"
                  onClick={() => confirmDelete(row.original)}
                >
                  Supprimer
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="50px" />
      </div>
    );
  }

  return (
    <div className="mt-12">
      <ToastContainer />
      <GenericTable
        data={data}
        columns={columns}
        filterPlaceholder="Filtrer par matière..."
        filterColumn="subject_info.name"
      />
      {showDeletePopup && selectedAssignment && (
        <Popup
          title="Confirmation de suppression"
          message={`Êtes-vous sûr de vouloir supprimer l'assignation pour ${selectedAssignment.subject_info.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default ListOfSubject;
