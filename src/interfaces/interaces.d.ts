export interface User {
    id: number;
    subjects_id: number;
    email: string;
    password: string;
    role: 'ADMIN' | 'TEACHER' ; 
    firstname: string;
    lastname: string;
    last_login: Date;
    created_at: Date;
    updated_at: Date;
  }

  export interface PartialUser {
    firstname: string;
    email: string;
    password: string;
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
    statuts: 'PENDING' | 'REFUSED' | 'CONFIRMED';
    assignments_courses_id: number;
    comment: string;
    start_at: Date;
    end_at: Date;
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
  