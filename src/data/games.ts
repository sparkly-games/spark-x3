import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    poster: "/posters/minecraft.webp",
    description: "Build, explore and survive in an endless sandbox filled with limitless possibilities.",
    rating: 4.8,
    tags: ["Adventure", "Singleplayer"]
  },
  {
    id: "bitlife",
    title: "BitLife",
    poster: "/posters/bitlife.png",
    description: "Shape your virtual life through thousands of choices, from birth to old age.",
    rating: 4.8,
    tags: ["Simulation", "Singleplayer"]
  },
  {
    id: "ridesims",
    title: "Ride Sims",
    poster: "/posters/ridesims.png",
    description: "Operate realistic roller coasters from around the world with authentic controls and procedures.",
    rating: 4.4,
    tags: ["Simulation", "Singleplayer"]
  },
  {
    id: "fnaf",
    title: "Five Nights at Freddy's",
    poster: "/posters/fnaf.webp",
    description: "Take the night shift at Freddy Fazbear's Pizza and survive five nights of relentless terror.",
    rating: 4.9,
    tags: ["Horror", "Adventure", "Singleplayer"]
  },
  {
    id: "fnaf2",
    title: "Five Nights at Freddy's 2",
    poster: "/posters/fnaf2.webp",
    description: "Return to Freddy Fazbear's Pizza and face new animatronics with even fewer ways to defend yourself.",
    rating: 3.7,
    tags: ["Horror", "Adventure", "Singleplayer"]
  },
  {
    id: "fnaf3",
    title: "Five Nights at Freddy's 3",
    poster: "/posters/fnaf3.webp",
    description: "Work the night shift at Fazbear's Fright and uncover the horrifying truth hidden within.",
    rating: 4.6,
    tags: ["Horror", "Adventure", "Singleplayer"]
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    poster: "/posters/subway-surfers.png",
    description: "Dash through colourful cities, dodge trains and collect coins in the endless runner.",
    rating: 4.7,
    tags: ["Adventure", "Singleplayer"]
  }
];