export interface Game {
  id: string;
  title: string;

  poster: string;
  hero?: string;

  description: string;

  rating: number;

  plays: number;
  saves: number;

  tags: string[];
}