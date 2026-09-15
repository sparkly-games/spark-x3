import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Maximize, Home, ArrowLeft } from "lucide-react";
import { games } from "../../data/games";

export default function Play() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const game = games.find((g) => g.id === id);

  if ( typeof id == "undefined" ) {
    id = "";
  }

  const enterFullscreen = () => {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* Game toolbar */}
      <header
        className="
          flex
          h-14
          shrink-0
          items-center
          justify-between
          border-b
          border-zinc-700
          bg-zinc-900
          px-4
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            title="Back"
            className="
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded
              border
              border-zinc-700
              bg-zinc-800
              text-zinc-300
              transition
              hover:bg-zinc-700
              hover:text-white
            "
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="ml-2 min-w-0">
            <h1 className="truncate text-sm font-bold">
              {game?.title ?? id}
            </h1>

            <p className="text-xs text-zinc-500">
              Playing now
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              flex
              h-9
              items-center
              gap-2
              rounded
              border
              border-zinc-700
              bg-zinc-800
              px-3
              text-sm
              font-medium
              text-zinc-300
              transition
              hover:bg-zinc-700
              hover:text-white
            "
          >
            <Home size={16} />
            Home
          </button>

          <button
            type="button"
            onClick={enterFullscreen}
            className="
              flex
              h-9
              items-center
              gap-2
              rounded
              border
              border-sky-500
              bg-sky-500
              px-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-sky-400
            "
          >
            <Maximize size={16} />
            Fullscreen
          </button>
        </div>
      </header>

      {/* Game area */}
      <main className="flex flex-1 items-center justify-center bg-black p-3">
        <div className="relative h-full w-full overflow-hidden border border-zinc-800 bg-black">
          {loading && (
            <div
              className="
                absolute
                inset-0
                z-10
                flex
                items-center
                justify-center
                bg-zinc-950
              "
            >
              <div className="text-center">
                <div className="mb-2 text-sm font-semibold">
                  Loading game
                </div>

                <div className="text-xs text-zinc-500">
                  Please wait...
                </div>
              </div>
            </div>
          )}

          <iframe
            src={`/static/${decodeURIComponent(id)}/index.html`}
            title={game?.title ?? id}
            onLoad={() => setLoading(false)}
            className="
              h-full
              min-h-[calc(100vh-80px)]
              w-full
              border-0
              bg-black
            "
            allow="fullscreen; autoplay"
          />
        </div>
      </main>
    </div>
  );
}