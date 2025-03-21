
export interface SocialMediaAccount {
  id: number;
  username: string;
  platform: string;
  era: string;
  last_post: string | null;
  still_used: boolean;
  notes: string | null;
  link: string | null;
  thumbnail: string | null;
}

export interface SocialMediaFilters {
  era: string;
  platform: string;
  active: string;
  query: string;
  page: number;
}
