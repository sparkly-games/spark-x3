import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Maximize, Home, ArrowLeft } from "lucide-react";
import { games } from "../../data/games";

export default function Play() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const game = games.find((g) => g.id === id);

  const enterFullscreen = () => {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="font-bold">
              {game?.title ?? id}
            </h1>

            <p className="text-sm text-zinc-400">
              Playing now
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 transition hover:bg-zinc-700"
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={enterFullscreen}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black transition hover:scale-105"
          >
            <Maximize size={18} />
            Fullscreen
          </button>
        </div>
      </header>


      {/* Game area */}
      <main className="relative flex flex-1 items-center justify-center p-4">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
            <p className="animate-pulse text-zinc-400">
              Loading game...
            </p>
          </div>
        )}

        <iframe
          src={`/static/${id}/index.html`}
          title={game?.title ?? id}
          onLoad={() => setLoading(false)}
          className="
            h-[calc(100vh-88px)]
            w-full
            margin-2
            rounded-xl
            border
            border-zinc-800
            bg-black
          "
        />
      </main>
    </div>
  );
}