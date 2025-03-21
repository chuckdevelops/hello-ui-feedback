
export interface FitPic {
  id: number;
  caption: string;
  thumbnail: string;
  release_date: string;
  photographer: string | null;
  pic_type: string;
  quality: string;
  era: string;
  portion: string;
  notes: string | null;
  source_links: string[];
}

export interface FitPicsFilters {
  era: string;
  type: string;
  quality: string;
  query: string;
  page: number;
}
