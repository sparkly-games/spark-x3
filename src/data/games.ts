import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "eaglercraft",
    title: "Minecraft",
    poster: "/images/games/eaglercraft.png",
    description: "Build, explore and survive in an endless sandbox filled with limitless possibilities.",
    rating: 4.8,
    tags: ["Adventure"]
  },
  {
    id: "bitlife",
    title: "BitLife",
    poster: "/images/games/bitlife.png",
    description: "Shape your virtual life through thousands of choices, from birth to old age.",
    rating: 4.8,
    tags: ["Simulation"]
  },
  {
    id: "ridesims",
    title: "Ride Sims",
    poster: "/images/games/ridesims.png",
    description: "Operate realistic roller coasters from around the world with authentic controls and procedures.",
    rating: 4.4,
    tags: ["Simulation"]
  },
  {
    id: "fnaf",
    title: "Five Nights at Freddy's",
    poster: "/images/games/fnaf1.png",
    description: "Take the night shift at Freddy Fazbear's Pizza and survive five nights of relentless terror.",
    rating: 4.9,
    tags: ["Horror", "Adventure"]
  },
  {
    id: "fnaf2",
    title: "Five Nights at Freddy's 2",
    poster: "/images/games/fnaf2.png",
    description: "Return to Freddy Fazbear's Pizza and face new animatronics with even fewer ways to defend yourself.",
    rating: 3.7,
    tags: ["Horror", "Adventure"]
  },
  {
    id: "fnaf3",
    title: "Five Nights at Freddy's 3",
    poster: "/images/games/fnaf3.png",
    description: "Work the night shift at Fazbear's Fright and uncover the horrifying truth hidden within.",
    rating: 4.6,
    tags: ["Horror", "Adventure"]
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    poster: "/images/games/subwaysurfers.png",
    description: "Dash through colourful cities, dodge trains and collect coins in the endless runner.",
    rating: 4.7,
    tags: ["Adventure"]
  }
];