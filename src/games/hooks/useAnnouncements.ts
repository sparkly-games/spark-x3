import { useEffect, useMemo, useState } from "react";

import {
  subscribeToAnnouncements,
  type Announcement,
} from "../lib/announcements";

import {
  getReadAnnouncementIds,
  markAnnouncementRead,
  markAllAnnouncementsRead,
} from "../lib/announcementReadState";

export function useAnnouncements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const [readIds, setReadIds] = useState<string[]>(
    getReadAnnouncementIds()
  );

  useEffect(() => {
    return subscribeToAnnouncements(setAnnouncements);
  }, []);

  const unreadAnnouncements = useMemo(() => {
    return announcements.filter(
      (announcement) =>
        !readIds.includes(announcement.id)
    );
  }, [announcements, readIds]);

  function markRead(id: string) {
    markAnnouncementRead(id);

    setReadIds((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );
  }

  function markAllRead() {
    markAllAnnouncementsRead(announcements);

    setReadIds(
      announcements.map(
        (announcement) => announcement.id
      )
    );
  }

  return {
    announcements,
    unreadAnnouncements,
    unreadCount: unreadAnnouncements.length,
    markRead,
    markAllRead,
  };
}