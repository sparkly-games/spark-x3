import Navbar from "../../components/Navbar/Navbar";
import GameRow from "../../components/GameRow/GameRow";
import { games } from "../../data/games";

export default function Home() {
  const tags = [
    ...new Set(
      games.flatMap((game) => game.tags)
    ),
  ];

  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        text-white
      "
    >
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20">
        {/* Welcome header */}
        <header
          className="
            mb-8
            rounded-md
            border
            border-zinc-800
            bg-zinc-900
            px-5
            py-4
          "
        >
          <h1 className="text-2xl font-bold">
            Spark X3 Games
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Play free games directly in your browser.
          </p>
        </header>

        {/* Game categories */}
        {tags.map((tag) => {
          const taggedGames = games.filter((game) =>
            game.tags.includes(tag)
          );

          if (taggedGames.length === 0) {
            return null;
          }

          return (
            <GameRow
              key={tag}
              title={tag}
              games={taggedGames}
            />
          );
        })}
      </div>
    </main>
  );
}