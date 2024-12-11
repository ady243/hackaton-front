export interface AffectationCourse {
    id: number;
    day: string;
    start_at: Date;
    end_at: Date;
    status: 'pending' | 'approved' | 'rejected'; 
    teachers_id: number;
    courses_id: number;
    groups_id: number;
  }