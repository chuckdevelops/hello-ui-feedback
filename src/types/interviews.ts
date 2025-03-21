
export interface Interview {
  id: number;
  outlet: string;
  subject_matter: string;
  thumbnail: string | null;
  date: string;
  interview_type: string; // This was 'type' in the code
  era: string;
  available: boolean;
  source_links: string | null;
  archived_link: string | null;
  special_notes: string | null;
  title: string; // Adding missing title property
  link: string | null; // Adding missing link property
}

export interface InterviewsFilters {
  era: string;
  type: string;
  available: string;
  query: string;
  page: number;
}
