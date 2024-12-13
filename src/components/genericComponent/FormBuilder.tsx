import React, { useState } from 'react';
import { FormBuilderProps } from '@/interfaces/interaces';
import { useAuth } from '@/context/AuthContext';

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, apiEndpoint, buttonText, onSubmit, onSuccess, onError }) => {
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stringifiedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = String(formData[key]);
      return acc;
    }, {} as Record<string, string>);

    console.log('Form Data:', stringifiedFormData);

    if (onSubmit) {
      await onSubmit(stringifiedFormData);
    } else if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(stringifiedFormData),
        });

        if (response.ok) {
          if (onSuccess) onSuccess('Données envoyées avec succès');
        } else {
          const error = await response.json();
          if (onError) onError('Une erreur est survenue lors de l\'envoi des données.');
          console.error('Erreur lors de l\'envoi des données:', error);
        }
      } catch (error) {
        if (onError) onError('Impossible de se connecter au serveur.');
        console.error('Erreur réseau:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block mb-2 text-sm font-medium">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required={field.required}
              value={String(formData[field.name] ?? '')}
            >
              <option value="" disabled>{field.placeholder}</option>
              {field.options && field.options.map((option: { value: string; label: string }) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required={field.required}
              value={String(formData[field.name] ?? '')}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600">
        {buttonText}
      </button>
    </form>
  );
};

export default FormBuilder;