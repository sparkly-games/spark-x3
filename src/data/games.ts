import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    poster: "/posters/minecraft.webp",
    description: "Build, explore and survive in a world of endless possibilities.",
    rating: 4.8,
    tags: ["Adventure", "Classic", "Simulation"],
    featured: true
  },
  {
    id: "ridesims",
    title: "Ride Sims",
    poster: "/posters/ridesims.png",
    description: "The ultimate roller coaster simulator. Operate rides from all around the UK.",
    rating: 4.4,
    tags: ["Simulation", "Geeky"],
  },
  {
    id: "fnaf",
    title: "Five Nights at Freddy's 1",
    poster: "/posters/fnaf.webp",
    description: "Welcome to Freddy Fazbear's Pizzeria. Survive five nights of terror in the classic horror game!",
    rating: 4.9,
    tags: ["Horror", "Classic"],
  },
  {
    id: "fnaf2",
    title: "Five Nights at Freddy's 2",
    poster: "/posters/fnaf2.webp",
    description: "Fazbear's Pizzeria is back with new animatronics and new challenges. Survive in this classic sequel!",
    rating: 3.7,
    tags: ["Horror"],
  },
  {
    id: "fnaf3",
    title: "Five Nights at Freddy's 3",
    poster: "/posters/fnaf3.webp",
    description: "Join the team at Fazbear's Fright and survive in this thrilling threequel to the classic horror game!",
    rating: 4.6,
    tags: ["Horror"],
  },
];