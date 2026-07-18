import type { Game } from "../../types/game";
import { Info, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GamePoster from "../GamePoster/GamePoster";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="
        group
        relative
        w-44
        shrink-0
        cursor-pointer
        transition-[width]
        duration-300
        hover:w-60
      "
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div
        className="
          relative
          aspect-[2/3]
          overflow-hidden
          rounded-xl
          bg-zinc-950
        "
      >
        <GamePoster
          src={game.poster}
          alt={game.title}
        />

        {/* Play button */}
        <button
          type="button"
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
            rounded-xl
            bg-black/50
            opacity-0
            transition-opacity
            duration-200
            group-hover:opacity-100
          "
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/play/${game.id}`);
          }}
        >
          <Play
            size={42}
            fill="currentColor"
          />
        </button>

        {/* Info button */}
        <button
          type="button"
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-black/60
            opacity-0
            transition-opacity
            duration-200
            group-hover:opacity-100
            hover:bg-white
            hover:text-black
          "
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/game/${game.id}`);
          }}
        >
          <Info size={18} />
        </button>
      </div>

      <div className="mt-2">
        <h3 className="truncate font-semibold">
          {game.title}
        </h3>

        <p className="text-sm text-zinc-400">
          ⭐ {game.rating}
        </p>
      </div>
    </div>
  );
}