export interface SessionCourse {
    id: number;
    availability: string;
    start_at: Date;
    end_at: Date;
    status: 'pending' | 'approved' | 'rejected';
    affectations_courses_id: number;
  }
  