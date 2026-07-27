import type { Game } from "../../types/game";
import { Play } from "lucide-react";
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
      onClick={() => navigate(`/play/${game.id}`)}
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