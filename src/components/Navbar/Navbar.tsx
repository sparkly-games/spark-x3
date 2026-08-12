import { Headphones, User } from "lucide-react";

export default function Navbar() {
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
            window.open("https://sc.bloat.cat/", "_blank");
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