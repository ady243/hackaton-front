import baseUrl from '@/config/baseUrl';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';


const ProffesorPageAdmin = () => {
  const [date, setDate] = useState<string | null>(null);
  const [startAt, setStartAt] = useState<string | null>(null);
  const [endAt, setEndAt] = useState<string | null>(null);
  const [comment, setComment] = useState<string>(''); 
  const [addedItems, setAddedItems] = useState<{ date: string; startAt: string; endAt: string; isSelected: boolean }[]>([]);
  const { currentUser } = useAuth();
  const { user, token } = currentUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user, token]);

  const handleAddItem = () => {
    if (date && startAt && endAt) {
      const newItem = {
        date,
        startAt,
        endAt,
        isSelected: false,
      };
      setAddedItems((prev) => [...prev, newItem]);
      setDate(null);
      setStartAt(null);
      setEndAt(null);
    }
  };

  const handleToggleSelect = (index: number) => {
    setAddedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, isSelected: !item.isSelected } : item))
    );
  };

  const handleRemoveItem = (index: number) => {
    setAddedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    const selectedItems = addedItems.filter((item) => item.isSelected);

    if (selectedItems.length === 0) {
      alert('Veuillez sélectionner au moins une disponibilité à envoyer.');
      return;
    }

    const dataToSend = selectedItems.map((item) => ({
      users_id: user?.id,
      comment: comment || 'Pas de commentaire',
      start_at: `${item.date}T${item.startAt}:00`, 
      end_at: `${item.date}T${item.endAt}:00`,
      is_recurring: false,

    }));

    try {
      const response = await fetch(`${baseUrl}/availabilities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Données envoyées avec succès');
        setAddedItems([]);
        setComment(''); 
      } else {
        const error = await response.json();
        console.error('Erreur lors de l\'envoi des données:', error);
        alert('Une erreur est survenue lors de l\'envoi des données.');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert('Impossible de se connecter au serveur.');
    }
  };

  return (
    <div className="flex justify-center items-start mt-10 top-16 ml-24">
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-4">Ajouter Disponibilités</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2 text-sm font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startAt" className="block mb-2 text-sm font-medium">
            Heure de début
          </label>
          <input
            type="time"
            id="startAt"
            value={startAt || ''}
            onChange={(e) => setStartAt(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endAt" className="block mb-2 text-sm font-medium">
            Heure de fin
          </label>
          <input
            type="time"
            id="endAt"
            value={endAt || ''}
            onChange={(e) => setEndAt(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600"
        >
          Ajouter
        </button>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-4">Liste des disponibilités</h2>
        <ul className="space-y-2">
          {addedItems.map((item, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div>
                <input
                  type="checkbox"
                  checked={item.isSelected}
                  onChange={() => handleToggleSelect(index)}
                  className="mr-2"
                />
                {`${item.date} de ${item.startAt} à ${item.endAt}`}
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Annuler
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <label htmlFor="comment" className="block mb-2 text-sm font-medium">
            Ajouter un commentaire
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Ajoutez un commentaire ici..."
          ></textarea>
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-blue-600"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default ProffesorPageAdmin;