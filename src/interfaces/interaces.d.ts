export interface User {
  id: number;
  subjects_id: number;
  email: string;
  password: string;
  role: 'ADMIN' | 'TEACHER';
  first_name: string; 
  last_name: string;  
  phone_number: string;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
}

  
  export interface Subject {
    id: number;
    name: string;
    hourly_volume: number;
    start_at: Date;
    end_at: Date;
  }
  
  export interface Class {
    id: number;
    fields_id: number;
    name: string;
  }
  
  export interface Field {
    id: number;
    name: string;
  }
  

  export interface EducationalCourse {
    id: number;
    description: string;
    day: Date;
  }
  

  export interface FieldHasEducationalCourse {
    fields_id: number;
    educational_courses_id: number;
    day_type_id: number;
  }
  
  export interface DayType {
    id: number;
    type: string;
  }
  

  export interface AssignmentCourse {
    id: number;
    classes_id: number;
    courses_id: number;
    users_id: number;
    url_online: string;
  }
  
  export interface SessionCourse {
    id: number;
    classrooms_id: number;
    assignments_subjects_id: number;
    comment: string;
    status: 'PENDING' | 'REFUSED' | 'CONFIRMED';
    start_at: Date;
    end_at: Date;
    classroom_info: {
      id: number;
      name: string;
      capacity: number;
    };
    assignment_info: {
      id: number;
      classes_id: number;
      subjects_id: number;
      users_id: number;
      url_online: string;
      class_info: {
        id: number;
        name: string;
        number_students: number;
      };
      subject_info: {
        id: number;
        name: string;
        hourly_volume: number;
        session_duration: number;
        start_at: Date;
        end_at: Date;
      };
      user_info: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      };
    };
  }
  export interface Classroom {
    id: number;
    name: string;
    capacity: number;
    equipments: string;
  }
  
  export interface Availability {
    users_id: number;
    comment: string;
    start_at: Date;
    end_at: Date;
    is_recurring: boolean;
  }
  
  export interface PartialUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
    role?: 'ADMIN' | 'TEACHER';
  }

  export interface FormField {
    name: keyof User | 'phone_number' | 'role' | 'number_students' | 'years_group_id' | 'name' | 'hourly_volume' | 'session_duration' | 'start_at' | 'end_at' | 'users_id' | 'courses_id' | 'classes_id' | 'url_online' | 'csv';
    label: string;
    type: string;
    required: boolean;
    value?: string | number | boolean | File; 
    defaultValue?: string;
    options?: { value: string; label: string }[];
    placeholder?: string;
    disabled?: boolean;
  }
  interface ProgressBarProps {
    message: string;
    type: 'success' | 'error';
  }
  

  export interface PopupProps {
    title: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: React.ReactNode; 
  }
  
  interface YearsGroup {
    id: number;
    name: string;
  }
  interface InvitationData {
    first_name: string;
    last_name: string;
    email: string;
  }

  export interface FormBuilderProps {
    fields: FormField[];
    apiEndpoint?: string;
    buttonText: string;
    onSubmit?: (data: FormData) => Promise<void>;
    onSuccess?: (message: string) => void;
    onError?: (message: string) => void;
    onReset?: () => void;
  }


  interface Assignment {
    id: number;
    classes_id: number;
    subjects_id: number;
    users_id: number;
    url_online: string;
    class_info: {
      id: number;
      name: string;
      number_students: number;
    };
    subject_info: {
      id: number;
      name: string;
      hourly_volume: number;
      session_duration: number;
      start_at: string;
      end_at: string;
    };
    user_info: {
      id: number;
      first_name: string;
      last_name: string;
    };
  }


  interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    color?: string;
    textColor?: string;
  }

  interface ClassItem {
    id: string;
    name: string;
  }
  
  interface AvailabilityItem {
    date: string;
    startAt: string;
    endAt: string;
    isSelected: boolean;
  }