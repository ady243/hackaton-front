import React, { useState, useEffect } from 'react';
import { FormBuilderProps } from '@/interfaces/interaces';
import { useAuth } from '@/context/AuthContext';

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, apiEndpoint, buttonText, onSubmit, onSuccess, onError, onReset }) => {
  const [formData, setFormData] = useState<Record<string, string | number | boolean | File>>({});
  const { token } = useAuth();

  useEffect(() => {
    const initialFormData: Record<string, string | number | boolean | File> = {};
    fields.forEach(field => {
      if (field.value !== undefined) {
        initialFormData[field.name] = field.value;
      }
    });
    setFormData(initialFormData);
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasFile = Object.values(formData).some(value => value instanceof File);
    let body: FormData | string;
    const headers: HeadersInit = {
      'Authorization': `Bearer ${token}`,
    };

    if (hasFile) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          formDataToSend.append(key, String(value));
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        }
      });
      body = formDataToSend;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(formData);
    }

    console.log('Form Data:', body);

    if (onSubmit) {
      await onSubmit(body as FormData);
    } else if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers,
          body,
        });

        if (response.ok) {
          if (onSuccess) onSuccess('Données envoyées avec succès');
          if (onReset) onReset(); // Réinitialiser le formulaire
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
              disabled={field.disabled}
            >
              <option value="" disabled>{field.placeholder}</option>
              {field.options && field.options.map((option: { value: string; label: string }) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required={field.required}
              placeholder={field.placeholder}
              disabled={field.disabled}
            />
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
              disabled={field.disabled}
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