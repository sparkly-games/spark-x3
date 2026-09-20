import type { Game } from "../../types/game";

import { useEffect, useState } from "react";

import GameCard from "../GameCard/GameCard";

import { useLanguage } from "../../../localisation/LanguageContext";

interface Props {
  title: string;
  games: Game[];
}

export default function GameRow({ title, games }: Props) {
  const strings = useLanguage().lang.src;

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (title === strings.pages.home.searchResults) {
      setIsCollapsed(false);
    }
  }, [title, strings.pages.home.searchResults]);

  const displayTitle =
    title === strings.pages.home.searchResults
      ? strings.pages.home.searchResults
      : strings.tags[title] ?? title;

  return (
    <section className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <h2
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="
            border-l-4
            border-blue-500
            pl-3
            text-xl
            font-bold
            text-white
            cursor-pointer
          "
        >
          {displayTitle}
        </h2>
      </div>

      {!isCollapsed && (
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
      )}
    </section>
  );
}