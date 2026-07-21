import { useParams, useNavigate } from "react-router-dom";
import { games } from "../../data/games";
import GamePoster from "../../components/GamePoster/GamePoster";
import { Home, Play, Star } from "lucide-react";

export default function Info() {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        <h1 className="text-3xl font-bold">Game not found</h1>
        <button className="mt-4 rounded-lg bg-sky-400 px-6 py-3 font-semibold transition hover:scale-105" onClick={() => navigate('/')}>
          <Home color="white" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-zinc-950/100 to-zinc-900" />

      <div className="mx-auto max-w-7xl px-8 py-16">
        {/* Hero */}
        <div className="flex flex-col gap-10 md:flex-row">
          {/* Poster */}
          <div className="w-56 shrink-0">
            <GamePoster
              src={game.poster}
              alt={game.title}
            />
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col justify-center">
            <h1 className="text-5xl font-black">
              {game.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-zinc-300">
              <span className="flex items-center gap-1">
                <Star
                  size={18}
                  fill="currentColor"
                />
                {game.rating}/5
              </span>

              <span>{game?.tags[0]}</span>
            </div>

            <p className="mt-6 max-w-3xl text-lg text-zinc-300">
              {game?.description}
            </p>

            <div className="mt-8 flex gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:scale-105" onClick={() => { console.log("clicked", game.id); navigate(`/play/${game.id}`) }}>
                <Play
                  size={20}
                  fill="currentColor"
                />
                Play Now
              </button>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            Information
          </h2>

          <div className="grid grid-cols-3 gap-y-4 md:grid-cols-6">
            <div>
              <p className="text-sm text-zinc-500">Genre</p>
              <p>{game?.tags[0]}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Rating</p>
              <p>{game.rating}/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}