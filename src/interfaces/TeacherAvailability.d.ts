export interface TeacherAvailability {
    id: number;
    availability: string;
    start_at: string;
    end_at: string;
    is_recurring: boolean;
    recurrence_pattern?: string;
    teachers_id: number;
  }