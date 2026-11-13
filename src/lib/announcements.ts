import {
  push,
  ref,
  set,
  update,
  remove,
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

/**
 * Listen for all announcements.
 */
export function subscribeToAnnouncements(
  callback: (announcements: Announcement[]) => void
): Unsubscribe {
  const announcementsRef = ref(database, "announcements");

  return onValue(
    announcementsRef,
    (snapshot) => {
      console.log(
        "Announcements snapshot:",
        snapshot.val()
      );

      const value = snapshot.val();

      if (!value) {
        callback([]);
        return;
      }

      const announcements: Announcement[] =
        Object.entries(value)
          .map(([id, data]) => ({
            id,
            ...(data as Omit<Announcement, "id">),
          }))
          .sort(
            (a, b) => b.createdAt - a.createdAt
          );

      console.log(
        "Parsed announcements:",
        announcements
      );

      callback(announcements);
    },
    (error) => {
      console.error(
        "Failed to subscribe to announcements:",
        error
      );
    }
  );
}

/**
 * Create a new announcement.
 */
export async function createAnnouncement(
  title: string,
  message: string,
  type: AnnouncementType,
  expiresAt: number | null
): Promise<string> {
  const announcementRef = push(
    ref(database, "announcements")
  );

  const announcement: Omit<Announcement, "id"> = {
    title: title.trim(),
    message: message.trim(),
    type,
    createdAt: Date.now(),
    expiresAt,
    enabled: true,
  };

  await set(announcementRef, announcement);

  if (!announcementRef.key) {
    throw new Error("Failed to create announcement.");
  }

  return announcementRef.key;
}

/**
 * Update an existing announcement.
 */
export async function updateAnnouncement(
  id: string,
  data: {
    title?: string;
    message?: string;
    type?: AnnouncementType;
    expiresAt?: number | null;
  }
): Promise<void> {
  const updates: Record<string, unknown> = {};

  if (data.title !== undefined) {
    updates.title = data.title.trim();
  }

  if (data.message !== undefined) {
    updates.message = data.message.trim();
  }

  if (data.type !== undefined) {
    updates.type = data.type;
  }

  if (data.expiresAt !== undefined) {
    updates.expiresAt = data.expiresAt;
  }

  await update(
    ref(database, `announcements/${id}`),
    updates
  );
}

/**
 * Enable or disable an announcement.
 */
export async function setAnnouncementEnabled(
  id: string,
  enabled: boolean
): Promise<void> {
  await update(
    ref(database, `announcements/${id}`),
    { enabled }
  );
}

/**
 * Delete an announcement permanently.
 */
export async function deleteAnnouncement(
  id: string
): Promise<void> {
  await remove(
    ref(database, `announcements/${id}`)
  );
}