export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
  }
  
  export interface FormBuilderProps {
    fields: FieldConfig[];
    apiEndpoint: string;
  }