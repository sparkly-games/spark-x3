import type { Game } from "../../types/game";
import GameCard from "../GameCard/GameCard";

interface Props {
  title: string;
  games: Game[];
}

export default function GameRow({ title, games }: Props) {
  return (
    <section className="mt-10">

      <h2
        className="
          mb-4
          text-2xl
          font-bold
        "
      >
        {title}
      </h2>

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          overflow-y-visible
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