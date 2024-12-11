export interface Constraint {
    id: number;
    type: string;
    description: string;
    value: string;
    classrooms_id?: number;
    teachers_id?: number;
    courses_id?: number;
    educational_calendar_id?: number;
  }