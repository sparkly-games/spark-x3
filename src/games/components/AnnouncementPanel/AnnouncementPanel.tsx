import {
  Info,
  Megaphone,
  TriangleAlert,
  CircleCheck,
  CircleX,
} from "lucide-react";

import type { Announcement } from "../../lib/announcements";

interface Props {
  announcements: Announcement[];
  unreadAnnouncements: Announcement[];
  onRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  critical: CircleX,
};

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

export default function AnnouncementPanel({
  announcements,
  unreadAnnouncements,
  onRead,
  onMarkAllRead,
}: Props) {
  return (
    <div
      className="
        absolute
        right-0
        top-12
        z-50
        w-80
        overflow-hidden
        rounded-md
        border
        border-zinc-800
        bg-zinc-950
        shadow-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-800
          px-4
          py-3
        "
      >
        <div className="flex items-center gap-2">
          <Megaphone size={16} />

          <span className="font-semibold">
            Announcements
          </span>

          {unreadAnnouncements.length > 0 && (
            <span className="text-xs text-zinc-500">
              {unreadAnnouncements.length} unread
            </span>
          )}
        </div>

        {unreadAnnouncements.length > 0 && (
          <button
            onClick={onMarkAllRead}
            className="
              text-xs
              text-zinc-400
              hover:text-white
            "
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {announcements.length === 0 ? (
          <div
            className="
              px-4
              py-10
              text-center
              text-sm
              text-zinc-500
            "
          >
            No announcements.
          </div>
        ) : (
          announcements.map((announcement) => {
            const Icon =
              icons[
                announcement.type as keyof typeof icons
              ];

            const unread = unreadAnnouncements.some(
              (item) => item.id === announcement.id
            );

            return (
              <button
                key={announcement.id}
                onClick={() => onRead(announcement.id)}
                className={`
                  w-full
                  border-b
                  border-zinc-800
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-zinc-900
                  ${
                    unread
                      ? "bg-zinc-900/60"
                      : ""
                  }
                `}
              >
                <div className="flex gap-3">
                  <Icon
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">
                        {announcement.title}
                      </h3>

                      {unread && (
                        <span
                          className="
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-red-500
                          "
                        />
                      )}
                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-relaxed
                        text-zinc-400
                      "
                    >
                      {announcement.message}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        text-zinc-600
                      "
                    >
                      {formatDate(
                        announcement.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}