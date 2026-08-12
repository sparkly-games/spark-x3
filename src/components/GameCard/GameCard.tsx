import type { Game } from "../../types/game";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GamePoster from "../GamePoster/GamePoster";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const navigate = useNavigate();

  const openGame = () => {
    navigate(`/play/${game.id}`);
  };

  return (
    <div
      className="
        group
        w-44
        shrink-0
        cursor-pointer
        rounded-md
        border
        border-zinc-700
        bg-zinc-900
        p-1.5
        shadow-sm
        transition
        duration-150
        hover:-translate-y-0.5
        hover:border-zinc-500
        hover:bg-zinc-800
        hover:shadow-md
      "
      onClick={openGame}
    >
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          rounded-sm
          bg-zinc-950
        "
      >
        <GamePoster
          src={game.poster}
          alt={game.title}
        />

        {/* Hover play button */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/55
            opacity-0
            transition-opacity
            duration-150
            group-hover:opacity-100
          "
        >
          <button
            type="button"
            aria-label={`Play ${game.title}`}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-lg
              transition
              hover:scale-105
            "
            onClick={(e) => {
              e.stopPropagation();
              openGame();
            }}
          >
            <Play
              size={20}
              fill="currentColor"
            />
          </button>
        </div>
      </div>

      <div className="px-1 pb-1 pt-2">
        <h3
          className="
            truncate
            text-sm
            font-semibold
            text-white
          "
          title={game.title}
        >
          {game.title}
        </h3>

        <div className="mt-0.5 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            ⭐ {game.rating}
          </span>

          <span
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-wide
              text-zinc-500
            "
          >
            Play
          </span>
        </div>
      </div>
    </div>
  );
}