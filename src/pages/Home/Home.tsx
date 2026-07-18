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

      <div className="pt-20 px-8">
        {tags.map((tag) => {
          const taggedGames = games.filter((game) =>
            game.tags.includes(tag)
          );

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