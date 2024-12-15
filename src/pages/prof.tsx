/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import ChatBubble from "@/components/ChatBubble";
import apiService from "@/lib/apiService";
import baseUrl from "@/config/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvailabilityItem } from "@/interfaces/interaces";



const timeRanges = {
  Matin: { start: "08:00", end: "13:00" },
  "Après-midi": { start: "14:00", end: "21:00" },
  "Toute la journée": [
    { start: "08:00", end: "13:00" },
    { start: "14:00", end: "21:00" },
  ],
};

const ProfessorPageAdmin = () => {
  const [mode, setMode] = useState<"single" | "range">("single");
  const [singleDate, setSingleDate] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<AvailabilityItem[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(typeof window !== "undefined" ? localStorage.getItem("token") : null);
  }, []);

  const validateDates = () => {
    if (mode === "range" && startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.error("La date de début doit être antérieure à la date de fin.");
      return false;
    }
    if (!singleDate && mode === "single") {
      toast.error("Veuillez sélectionner une date.");
      return false;
    }
    if (!startDate && mode === "range") {
      toast.error("Veuillez sélectionner une date de début.");
      return false;
    }
    if (!endDate && mode === "range") {
      toast.error("Veuillez sélectionner une date de fin.");
      return false;
    }
    if (!timeRange) {
      toast.error("Veuillez sélectionner une plage horaire.");
      return false;
    }
    return true;
  };

  const handleAddAvailability = () => {
    if (!validateDates()) return;

    const dates =
      mode === "range" && startDate && endDate
        ? generateDateRange(startDate, endDate)
        : singleDate
        ? [singleDate]
        : [];

    const newAvailabilities = dates.flatMap((date) => {
      const range = timeRanges[timeRange as keyof typeof timeRanges];
      if (Array.isArray(range)) {
        return range.map((slot) => ({
          date,
          startAt: slot.start,
          endAt: slot.end,
          isSelected: false,
        }));
      }
      return [
        {
          date,
          startAt: range.start,
          endAt: range.end,
          isSelected: false,
        },
      ];
    });

    setAddedItems((prev) => [...prev, ...newAvailabilities]);
    resetFields();
  };

  const resetFields = () => {
    setSingleDate(null);
    setStartDate(null);
    setEndDate(null);
    setTimeRange(null);
  };

  const handleRemoveSelected = () => {
    setAddedItems((prev) => prev.filter((item) => !item.isSelected));
  };

  const handleSend = async () => {
    if (!token) {
      toast.error("Vous devez être connecté pour envoyer les données.");
      return;
    }

    const formattedData = addedItems.map((item) => ({
      start_at: `${item.date}T${item.startAt}:00`,
      end_at: `${item.date}T${item.endAt}:00`,
    }));

    try {
      await apiService.fetchWithAuth(
        `${baseUrl}/availabilities/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slots: formattedData }),
        },
        token
      );

      toast.success("Disponibilités envoyées avec succès !");
      setAddedItems([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi des disponibilités :", error);
      toast.error("Une erreur est survenue lors de l'envoi des disponibilités.");
    }
  };

  const generateDateRange = (start: string, end: string): string[] => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    while (startDate <= endDate) {
      dates.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-bold">Saisie des disponibilités</h1>

      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Ajouter Disponibilités</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Mode de saisie</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setMode("single")}
              className={`py-2 px-4 rounded-md ${mode === "single" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Par jour
            </button>
            <button
              onClick={() => setMode("range")}
              className={`py-2 px-4 rounded-md ${mode === "range" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Par période
            </button>
          </div>
        </div>

        {mode === "single" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={singleDate || ""}
              onChange={(e) => setSingleDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}

        {mode === "range" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date de début</label>
              <input
                type="date"
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date de fin</label>
              <input
                type="date"
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Plage Horaire</label>
          {Object.keys(timeRanges).map((range) => (
            <label key={range} className="flex items-center space-x-2">
              <input
                type="radio"
                name="timeRange"
                value={range}
                checked={timeRange === range}
                onChange={(e) => setTimeRange(e.target.value)}
              />
              <span>{range}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleAddAvailability}
          disabled={!validateDates()}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ajouter Disponibilités
        </button>
      </div>

      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Liste des disponibilités</h2>

        {addedItems.length === 0 ? (
          <p>Aucune disponibilité ajoutée.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Sélection</th>
                <th className="border border-gray-300 px-2 py-1">Date</th>
                <th className="border border-gray-300 px-2 py-1">Plage Horaire</th>
                <th className="border border-gray-300 px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addedItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={() =>
                        setAddedItems((prev) =>
                          prev.map((itm, idx) =>
                            idx === index ? { ...itm, isSelected: !itm.isSelected } : itm
                          )
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">{item.date}</td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.startAt} - {item.endAt}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <button
                      onClick={() =>
                        setAddedItems((prev) => prev.filter((_, idx) => idx !== index))
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {addedItems.length > 0 && (
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleRemoveSelected}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Supprimer Sélection
            </button>
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Valider Disponibilités
            </button>
          </div>
        )}
      </div>

      <button
        className="fixed bottom-4 right-4 p-4 bg-indigo-500 text-white rounded-full shadow-lg"
        onClick={() => setShowChat(!showChat)}
      >
        <AiOutlineRobot size={24} />
      </button>
      {showChat && (
        <div className="fixed bottom-16 right-4 w-80 p-4 bg-blue-100 rounded-lg shadow-lg">
          <ChatBubble text="Ceci est un message de l'IA." />
        </div>
      )}
    </div>
  );
};

export default ProfessorPageAdmin;
