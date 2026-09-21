import { Headphones, User, Search, X } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "../../../localisation/LanguageContext";
import { langs } from "../../../localisation/create-lang";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { language, setLanguage, lang } = useLanguage();
  const strings = lang.src;

  const [search, setSearch] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);

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
        {strings.pages.home.title}
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
          placeholder={strings.pages.home.searchPlaceholder}
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
        {/* Language */}
        <div className="relative">
          <button
            type="button"
            title="Language"
            aria-label="Language"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((open) => !open)}
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
              text-base
              leading-none
              transition
              hover:border-zinc-500
              hover:bg-zinc-700
            "
          >
            {lang.icon}
          </button>

          {languageOpen && (
            <div
              className="
                absolute
                right-0
                top-11
                z-50
                min-w-40
                overflow-hidden
                rounded-lg
                border
                border-zinc-700
                bg-zinc-900
                p-1
                shadow-xl
              "
            >
              {Object.entries(langs).map(([code, languageData]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setLanguage(code);
                    setLanguageOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-2
                    rounded-md
                    px-3
                    py-2
                    text-left
                    text-sm
                    transition
                    hover:bg-zinc-800
                    ${
                      language === code
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-300"
                    }
                  `}
                >
                  <span className="w-6 text-center">
                    {languageData.icon}
                  </span>

                  <span>
                    {languageData.displayName.replace(
                      `${languageData.icon} `,
                      ""
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Music */}
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

        {/* Account */}
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