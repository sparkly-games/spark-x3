import type { Game } from "../../types/game";
import GameCard from "../GameCard/GameCard";

interface Props {
  title: string;
  games: Game[];
}

export default function GameRow({ title, games }: Props) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2
          className="
            border-l-4
            border-blue-500
            pl-3
            text-xl
            font-bold
            text-white
          "
        >
          {title}
        </h2>

        <button
          type="button"
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-zinc-400
            transition
            hover:text-white
          "
        >
          View All
        </button>
      </div>

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          overflow-y-visible
          pb-3
          scrollbar-hide
        "
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}