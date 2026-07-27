import type { Game } from "../types/game";

export const games: Game[] = [
  {
    id: "minecraft",
    title: "Minecraft",
    poster: "/posters/minecraft.webp",
    description: "Build, explore and survive in a world of endless possibilities.",
    rating: 4.8,
    tags: ["Adventure", "Classic", "Simulation", "Sandbox"]
  },
  {
    id: "bitlife",
    title: "BitLife",
    poster: "/posters/bitlife.png",
    description: "Live a virtual life where every choice shapes your story.",
    rating: 4.8,
    tags: ["Simulation", "Sandbox", "Choices"]
  },
  {
    id: "ridesims",
    title: "Ride Sims",
    poster: "/posters/ridesims.png",
    description: "The ultimate roller coaster simulator. Operate rides from across the globe.",
    rating: 4.4,
    tags: ["Simulation", "Theme Parks", "Operator"]
  },
  {
    id: "fnaf",
    title: "Five Nights at Freddy's",
    poster: "/posters/fnaf.webp",
    description: "Welcome to Freddy Fazbear's Pizza. Survive five nights of terror in the classic horror game.",
    rating: 4.9,
    tags: ["Horror", "Classic", "Survival"]
  },
  {
    id: "fnaf2",
    title: "Five Nights at Freddy's 2",
    poster: "/posters/fnaf2.webp",
    description: "Freddy Fazbear's Pizza returns with new animatronics and even greater challenges.",
    rating: 3.7,
    tags: ["Horror", "Survival"]
  },
  {
    id: "fnaf3",
    title: "Five Nights at Freddy's 3",
    poster: "/posters/fnaf3.webp",
    description: "Take the night shift at Fazbear's Fright and face the attraction's darkest secrets.",
    rating: 4.6,
    tags: ["Horror", "Survival"]
  }
];