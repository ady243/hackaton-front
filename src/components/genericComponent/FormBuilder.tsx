"use client";

import React, { useEffect, useState } from 'react';

interface FormBuilderProps {
  fields: { name: string; label: string; type: string; value?: string; options?: { value: string; label: string }[]; required?: boolean; disabled?: boolean }[];
  apiEndpoint?: string;
  buttonText?: string;
  headers?: Record<string, string>;
  onSubmit?: (formData: Record<string, string>) => Promise<void>;
}

function FormBuilder({ fields, apiEndpoint, buttonText = "Soumettre", headers, onSubmit }: FormBuilderProps) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || '';
      return acc;
    }, {} as Record<string, string>)
  );

  useEffect(() => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = field.value || '';
        return acc;
      }, {} as Record<string, string>)
    );
  }, [fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    } else if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('Form data submitted successfully');
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}:
          </label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              disabled={field.disabled}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Sélectionnez une option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              disabled={field.disabled}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              disabled={field.disabled}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      ))}
      <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {buttonText}
      </button>
    </form>
  );
}

export default FormBuilder;