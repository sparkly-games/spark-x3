
import { Calculator, Gamepad2, Headphones, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../src/localisation/LanguageContext";
import { langs } from "../src/localisation/create-lang";

interface NavbarProps {
  onSearch?: (query: string) => void;
  ver?: string;
  showSearch?: boolean;
}

export default function Navbar({ onSearch, ver, showSearch }: NavbarProps) {
  const { language, setLanguage, lang } = useLanguage();
  const strings = lang.src;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [isMusicBlocked, setIsMusicBlocked] = useState(false);

  useEffect(() => {
    const checkMusicBlocked = async () => {
      const blocked = await fetch("https://sc.bloat.cat/", {
        method: "HEAD",
        mode: "no-cors",
      })
        .then(() => false)
        .catch(() => true);

      setIsMusicBlocked(blocked);
    };

    checkMusicBlocked();
  }, []);

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
        grid
        h-14
        w-full
        grid-cols-[1fr_minmax(0,448px)_1fr]
        items-center
        gap-4
        border-b
        border-zinc-700
        bg-zinc-900
        px-5
        flex
      "
    >
      {/* Left: Logo and shortcuts */}
      <div className="flex min-w-0 items-center gap-4 justify-self-start">
        <button
          type="button"
          className="
            flex
            shrink-0
            cursor-pointer
            items-center
            gap-2
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
          <span>{strings.pages.home.title}</span>

          {ver !== "Unknown" && ver && (
            <span className="text-xs font-normal text-gray-200">
              {ver}
            </span>
          )}
        </button>

        <div className="h-5 w-px bg-zinc-700 m-5" />

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            title="Games"
            aria-label="Games"
            className="
              flex h-9 w-9 items-center justify-center
              rounded border border-zinc-700 bg-zinc-800
              text-zinc-300 transition
              hover:border-zinc-500 hover:bg-zinc-700 hover:text-white
            "
            onClick={() => navigate("/games")}
          >
            <Gamepad2 size={18} />
          </button>

          <button
            type="button"
            title="Calculator"
            aria-label="Calculator"
            className="
              flex h-9 w-9 items-center justify-center
              rounded border border-zinc-700 bg-zinc-800
              text-zinc-300 transition
              hover:border-zinc-500 hover:bg-zinc-700 hover:text-white
            "
            onClick={() => navigate("/smart-calculator")}
          >
            <Calculator size={18} />
          </button>
        </div>
      </div>

      {/* Centre: Search */}
        <div
          className={`
            flex w-full min-w-0 items-center gap-2
            ${showSearch ? "rounded-lg border border-zinc-700 bg-zinc-800" : ""}
            px-3 py-2
            focus-within:border-zinc-500
          `}
        >
        {showSearch && (
          <>
          <Search size={17} className="shrink-0 text-zinc-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={strings.pages.home.searchPlaceholder}
            className="
              min-w-0 flex-1 bg-transparent
              text-sm text-white outline-none
              placeholder:text-zinc-500
            "
            aria-label="Search games"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="shrink-0 text-zinc-500 transition hover:text-white"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
          </>
        )}
        </div>

      {/* Right: Language and music */}
      <div className="flex items-center gap-2 justify-self-end">
        {/* Language */}
        <div className="relative">
          <button
            type="button"
            title="Language"
            aria-label="Language"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((open) => !open)}
            className="
              flex h-9 w-9 cursor-pointer items-center justify-center
              rounded border border-zinc-700 bg-zinc-800
              text-base leading-none transition
              hover:border-zinc-500 hover:bg-zinc-700
            "
          >
            {lang.icon}
          </button>

          {languageOpen && (
            <div
              className="
                absolute right-0 top-11 z-50 min-w-40
                overflow-hidden rounded-lg border border-zinc-700
                bg-zinc-900 p-1 shadow-xl
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
                    flex w-full items-center gap-2 rounded-md
                    px-3 py-2 text-left text-sm transition
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
          disabled={isMusicBlocked}
          type="button"
          title="Music"
          aria-label="Music"
          className={`
            flex h-9 w-9 items-center justify-center
            rounded border border-zinc-700 bg-zinc-800
            text-zinc-300 transition
            ${
              isMusicBlocked
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
            }
          `}
          onClick={() => {
            window.open("https://sc.bloat.cat/", "_blank", "noopener,noreferrer");
          }}
        >
          <Headphones size={18} />
        </button>
      </div>
    </nav>
  );
}
