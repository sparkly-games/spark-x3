import Navbar from "../../components/Navbar/Navbar";
import GameRow from "../../components/GameRow/GameRow";
import AnnouncementPanel from "../../components/AnnouncementPanel/AnnouncementPanel";

import { games } from "../../data/games";

import { Megaphone } from "lucide-react";

import { useRef, useState } from "react";
import { useAnnouncements } from "../../hooks/useAnnouncements";

import { getDeviceId } from "../../lib/deviceId";

export default function Home() {
  const tags = [
    ...new Set(
      games.flatMap((game) => game.tags)
    ),
  ];

  const [open, setOpen] = useState(false);
  const [showDeviceId, setShowDeviceId] =
    useState(false);

  const lastGamesTap = useRef(0);

  const deviceId = getDeviceId();

  const {
    announcements,
    unreadAnnouncements,
    unreadCount,
    markRead,
    markAllRead,
  } = useAnnouncements();

  function handleGamesTap() {
    const now = Date.now();

    if (now - lastGamesTap.current < 350) {
      setShowDeviceId(true);
    }

    lastGamesTap.current = now;
  }

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

            <div
              className="
                mt-5
                rounded-lg
                border
                border-zinc-800
                bg-zinc-950
                p-4
              "
            >
              <code
                className="
                  block
                  break-all
                  text-sm
                  text-zinc-200
                "
              >
                {deviceId}
              </code>
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
    </main>
  );
}