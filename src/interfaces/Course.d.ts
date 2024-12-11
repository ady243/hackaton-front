export interface Course {
    id: number;
    name: string;
    hourly_volume: number;
    frequency_session: string;
    duration_session: number;
    start_at: Date;
    end_at: Date;
  }