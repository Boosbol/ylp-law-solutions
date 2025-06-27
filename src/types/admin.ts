
export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  date_taken: string;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  dispute_value: string;
  status: string;
  case_number: string;
  description: string;
  results: string[];
  challenges: string[];
  solutions: string[];
  created_at: string;
}

export interface NewPhoto {
  title: string;
  description: string;
  date_taken: string;
}

export interface NewCase {
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  dispute_value: string;
  status: string;
  case_number: string;
  description: string;
  results: string;
  challenges: string;
  solutions: string;
}
