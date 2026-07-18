export interface Game {
  id: string;
  title: string;

  poster: string;
  hero?: string;
  featured?: boolean;

  description: string;

  rating: number;

  tags: string[];
}