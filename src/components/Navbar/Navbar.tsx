import { Headphones, Tv, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="
      fixed
      top-0
      z-50
      flex
      h-16
      w-full
      items-center
      justify-between
      bg-zinc-950/80
      px-8
      backdrop-blur
    ">

      <h1 className="
        text-2xl
        font-bold
        text-sky-400
      ">
        Spark X3
      </h1>

      <input
        placeholder="Search games..."
        className="
          rounded-lg
          bg-zinc-900
          px-4
          py-2
          outline-none
        "
      />

      <div>
        <button className="
          mr-4
          rounded-lg
          bg-zinc-900
          px-4
          py-2
        ">
          <Headphones />
        </button>
        <button className="
          mr-4
          rounded-lg
          bg-zinc-900
          px-4
          py-2
        ">
          <Tv />
        </button>
        <button className="
          rounded-lg
          bg-sky-400
          px-4
          py-2
        ">
          <User />
        </button>
      </div>

    </nav>
  );
}