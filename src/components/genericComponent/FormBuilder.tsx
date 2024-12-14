/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export interface FormField {
  name: string;
  label: string;
  type: "number" | "text" | "email" | "select" | "file" | "date";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: (value: any, formData?: Record<string, any>) => string | null;
  disabled?: boolean;
}

interface FormBuilderProps {
  title?: string;
  description?: string;
  fields: FormField[];
  apiEndpoint?: string;
  buttonText: string;
  onSubmit?: (formData: FormData | Record<string, any>) => void;
  onSuccess?: () => void;
  onError?: () => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  title,
  description,
  fields,
  apiEndpoint,
  buttonText,
  onSubmit,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const initialFormData: Record<string, any> = {};
    fields.forEach((field) => {
      initialFormData[field.name] = "";
    });
    setFormData(initialFormData);
  }, [fields]);

  const validateField = (name: string, value: any) => {
    const field = fields.find((f) => f.name === name);
    if (field?.required && !value) {
      return `${field.label} est requis.`;
    }
    if (field?.validation) {
      return field.validation(value, formData);
    }
    return null;
  };

  const validateAllFields = () => {
    const newErrors: Record<string, string | null> = {};
    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    const newValue = files && files.length > 0 ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return; 
    }

    setIsSubmitting(true);
    let body: FormData | Record<string, any>;
    const hasFile = Object.values(formData).some((value) => value instanceof File);

    if (hasFile) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        formDataToSend.append(key, value);
      });
      body = formDataToSend;
    } else {
      body = formData;
    }

    try {
      if (onSubmit) {
        await onSubmit(body);
      } else if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: hasFile
            ? { Authorization: `Bearer ${token}` }
            : { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: hasFile ? (body as FormData) : JSON.stringify(body),
        });

        if (response.ok) {
          if (onSuccess) onSuccess();
        } else {
          if (onError) onError();
        }
      }
    } catch (error) {
      if (onError) onError();
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md w-full max-w-lg">
      {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`border rounded-md p-2 w-full ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                disabled={field.disabled}
              >
                <option value="" disabled>
                  {field.placeholder || "Sélectionnez une option"}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`border rounded-md p-2 w-full ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={field.placeholder}
                disabled={field.disabled}
              />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting || Object.values(errors).some((error) => error)}
          className={`w-full p-2 rounded-md text-white ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Chargement..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
