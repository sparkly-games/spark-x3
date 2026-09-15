import {
  ref,
  onValue,
  type Unsubscribe,
} from "firebase/database";

import { database } from "./firebase";

export type AnnouncementType =
  | "info"
  | "success"
  | "warning"
  | "critical";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  createdAt: number;
  expiresAt: number | null;
  enabled: boolean;
}

export function subscribeToAnnouncements(
  callback: (announcements: Announcement[]) => void
): Unsubscribe {
  const announcementsRef = ref(
    database,
    "announcements"
  );

  return onValue(announcementsRef, (snapshot) => {
    const value = snapshot.val();

    if (!value) {
      callback([]);
      return;
    }

    const now = Date.now();

    const announcements: Announcement[] = Object.entries(value)
      .map(([id, data]) => ({
        id,
        ...(data as Omit<Announcement, "id">),
      }))
      .filter((announcement) => {
        if (!announcement.enabled) {
          return false;
        }

        if (
          announcement.expiresAt !== null &&
          now >= announcement.expiresAt
        ) {
          return false;
        }

        return true;
      })
      .sort(
        (a, b) => b.createdAt - a.createdAt
      );

    callback(announcements);
  });
}