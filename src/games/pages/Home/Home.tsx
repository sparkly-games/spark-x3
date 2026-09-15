import Navbar from "../../components/Navbar/Navbar";
import GameRow from "../../components/GameRow/GameRow";
import AnnouncementPanel from "../../components/AnnouncementPanel/AnnouncementPanel";

import { games } from "../../data/games";

import { Key, Megaphone, Trash2 } from "lucide-react";

import { useRef, useState } from "react";

import { useAnnouncements } from "../../hooks/useAnnouncements";
import { getDeviceId } from "../../lib/deviceId";

export default function Home() {
  const tags = [
    ...new Set(
      games.flatMap((game) => game.tags)
    ),
  ].sort((a, b) => a.localeCompare(b));

  const [open, setOpen] = useState(false);
  const [showDeviceId, setShowDeviceId] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);

  const [search, setSearch] = useState("");

  const [unlockCode, setUnlockCode] = useState("");
  const [unlockError, setUnlockError] = useState("");

  const lastGamesTap = useRef(0);

  const deviceId = getDeviceId();

  const {
    announcements,
    unreadAnnouncements,
    unreadCount,
    markRead,
    markAllRead,
  } = useAnnouncements();

  const filteredGames = games.filter((game) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      game.title.toLowerCase().includes(query) ||
      game.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      )
    );
  });

  function handleGamesTap() {
    const now = Date.now();

    if (now - lastGamesTap.current < 350) {
      setShowDeviceId(true);
    }

    lastGamesTap.current = now;
  }

  function handleUnlock() {
    const code = unlockCode.trim();

    if (!code) {
      setUnlockError("Enter an unlock code.");
      return;
    }

    // Replace this with your actual unlock code.
    if (code !== "CLE4N-SPRX3") {
      setUnlockError("Invalid unlock code.");
      return;
    }

    // 6 hours from now.
    const expiresAt =
      Date.now() + 6 * 60 * 60 * 1000;

    localStorage.setItem(
      "sparkx3:broken-games-unlock",
      String(expiresAt)
    );

    setUnlockCode("");
    setUnlockError("");
    setShowUnlock(false);
    setShowDeviceId(false);

    // Refresh so GameCards immediately see the unlock.
    window.location.reload();
  }

  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        text-white
      "
    >
      <Navbar onSearch={setSearch} />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-20">
        {/* Welcome header */}
        <header
          className="
            relative
            mb-8
            flex
            items-center
            justify-between
            rounded-md
            border
            border-zinc-800
            bg-zinc-900
            px-5
            py-4
          "
        >
          <div>
            <h1 className="text-2xl font-bold">
              Spark X3{" "}
              <span
                onClick={handleGamesTap}
                className="
                  cursor-default
                  select-none
                "
              >
                Games
              </span>
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Play free games directly in your browser.
            </p>
          </div>

          {/* Announcements */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                relative
                rounded-md
                p-2
                text-zinc-400
                transition
                hover:bg-zinc-800
                hover:text-white
              "
              aria-label="Announcements"
            >
              <Megaphone size={21} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    min-h-4
                    min-w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-bold
                    leading-none
                    text-white
                  "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {open && (
              <AnnouncementPanel
                announcements={announcements}
                unreadAnnouncements={
                  unreadAnnouncements
                }
                onRead={markRead}
                onMarkAllRead={markAllRead}
              />
            )}
          </div>
        </header>

        {/* Games */}
        {search.trim() ? (
          filteredGames.length > 0 ? (
            <GameRow
              title="Search results"
              games={filteredGames}
            />
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-zinc-500">
                No games found for "{search}".
              </p>
            </div>
          )
        ) : (
          <>
            {/* Game categories */}
            {tags.map((tag) => {
              const taggedGames = games.filter(
                (game) => game.tags.includes(tag)
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
          </>
        )}
      </div>

      {/* Device reference modal */}
      {showDeviceId && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-5
          "
          onClick={() => setShowDeviceId(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">
                  Device reference
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Provide this reference to an
                  administrator if you need help.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDeviceId(false)
                }
                className="
                  rounded-md
                  px-2
                  py-1
                  text-xl
                  leading-none
                  text-zinc-400
                  hover:bg-zinc-800
                  hover:text-white
                "
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Device ID + key button */}
            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-zinc-800
                bg-zinc-950
                p-3
              "
            >
              <code
                className="
                  min-w-0
                  flex-1
                  break-all
                  text-sm
                  text-zinc-200
                "
              >
                {deviceId}
              </code>

              <button
                type="button"
                onClick={() => {
                  setShowUnlock(true);
                  setUnlockError("");
                }}
                className="
                  shrink-0
                  rounded-md
                  p-2
                  text-zinc-500
                  transition
                  hover:bg-zinc-800
                  hover:text-white
                "
                aria-label="Unlock broken games"
                title="Unlock broken games"
              >
                <Key size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowDeviceId(false)
              }
              className="
                mt-4
                w-full
                rounded-lg
                bg-white
                px-4
                py-2
                font-semibold
                text-black
                transition
                hover:bg-zinc-200
              "
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Unlock broken games modal */}
      {showUnlock && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-black/70
            p-5
          "
          onClick={() => setShowUnlock(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-zinc-800
                  "
                >
                  <Key
                    size={20}
                    className="text-zinc-300"
                  />
                </div>

                <h2 className="text-lg font-bold">
                  Unlock broken games
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Enter an unlock code to temporarily
                  access games marked as broken.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowUnlock(false)
                }
                className="
                  rounded-md
                  px-2
                  py-1
                  text-xl
                  leading-none
                  text-zinc-400
                  hover:bg-zinc-800
                  hover:text-white
                "
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              value={unlockCode}
              onChange={(event) => {
                setUnlockCode(event.target.value);
                setUnlockError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleUnlock();
                }
              }}
              placeholder="Enter unlock code"
              autoFocus
              className="
                mt-5
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-950
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
                focus:border-zinc-500
              "
            />

            {unlockError && (
              <p className="mt-2 text-sm text-red-400">
                {unlockError}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleUnlock}
                className="
                  flex-1
                  rounded-lg
                  bg-white
                  px-4
                  py-2
                  font-semibold
                  text-black
                  transition
                  hover:bg-zinc-200
                "
              >
                Unlock for 6 hours
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(
                    "sparkx3:broken-games-unlock"
                  );

                  setUnlockCode("");
                  setUnlockError("");
                  setShowUnlock(false);

                  window.location.reload();
                }}
                className="
                  flex
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-zinc-700
                  text-zinc-500
                  transition
                  hover:border-red-500/40
                  hover:bg-red-500/10
                  hover:text-red-400
                "
                aria-label="Revoke access"
                title="Revoke access"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}