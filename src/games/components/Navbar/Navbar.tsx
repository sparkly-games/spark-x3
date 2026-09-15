import { Headphones, User, Search, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [search, setSearch] = useState("");

  function handleSearch(value: string) {
    setSearch(value);
    onSearch?.(value);
  }

  function clearSearch() {
    setSearch("");
    onSearch?.("");
  }

  return (
    <nav
      className="
        fixed
        top-0
        z-50
        flex
        h-14
        w-full
        items-center
        justify-between
        border-b
        border-zinc-700
        bg-zinc-900
        px-5
      "
    >
      {/* Logo */}
      <button
        type="button"
        className="
          cursor-pointer
          text-xl
          font-bold
          text-sky-400
          transition
          hover:text-sky-300
        "
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Spark X3
      </button>

      {/* Search */}
      <div
        className="
          absolute
          left-1/2
          flex
          w-full
          max-w-md
          -translate-x-1/2
          items-center
          gap-2
          rounded-lg
          border
          border-zinc-700
          bg-zinc-800
          px-3
          py-2
          focus-within:border-zinc-500
        "
      >
        <Search
          size={17}
          className="shrink-0 text-zinc-500"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          placeholder="Search games..."
          className="
            min-w-0
            flex-1
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-zinc-500
          "
          aria-label="Search games"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              shrink-0
              text-zinc-500
              transition
              hover:text-white
            "
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Music"
          className="
            flex
            h-9
            w-9
            cursor-pointer
            items-center
            justify-center
            rounded
            border
            border-zinc-700
            bg-zinc-800
            text-zinc-300
            transition
            hover:border-zinc-500
            hover:bg-zinc-700
            hover:text-white
          "
          onClick={() => {
            window.open(
              "https://sc.bloat.cat/",
              "_blank"
            );
          }}
        >
          <Headphones size={18} />
        </button>

        <button
          type="button"
          title="Account"
          disabled
          aria-disabled
          className="
            flex
            h-9
            w-9
            cursor-not-allowed
            items-center
            justify-center
            rounded
            border
            border-zinc-800
            bg-zinc-800
            text-zinc-600
          "
        >
          <User size={18} />
        </button>
      </div>
    </nav>
  );
}
