
export interface Interview {
  id: number;
  outlet: string;
  subject_matter: string;
  thumbnail: string | null;
  date: string;
  interview_type: string;
  era: string;
  available: boolean;
  source_links: string | null;
  archived_link: string | null;
  special_notes: string | null;
}

export interface InterviewsFilters {
  era: string;
  type: string;
  available: string;
  query: string;
  page: number;
}
