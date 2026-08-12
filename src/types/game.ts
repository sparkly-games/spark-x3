export interface Game {
  id: string;
  title: string;

  // Square game artwork / logo used on cards
  poster: string;

  // Optional wide artwork used for featured games
  hero?: string;

  featured?: boolean;

  description?: string;

  tags: string[];
}