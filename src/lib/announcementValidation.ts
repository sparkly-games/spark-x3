import type { AnnouncementType } from "./announcements";

const announcementTypes: AnnouncementType[] = [
  "info",
  "success",
  "warning",
  "critical",
];

export function validateAnnouncement(data: {
  title: string;
  message: string;
  type: AnnouncementType;
  expiresAt: number | null;
}) {
  const errors: string[] = [];

  if (!data.title.trim()) {
    errors.push("Title is required.");
  }

  if (data.title.trim().length > 100) {
    errors.push("Title must be 100 characters or less.");
  }

  if (!data.message.trim()) {
    errors.push("Message is required.");
  }

  if (data.message.trim().length > 1000) {
    errors.push("Message must be 1000 characters or less.");
  }

  if (!announcementTypes.includes(data.type)) {
    errors.push("Invalid announcement type.");
  }

  if (
    data.expiresAt !== null &&
    (!Number.isFinite(data.expiresAt) ||
      data.expiresAt <= Date.now())
  ) {
    errors.push(
      "Expiration must be a valid future date."
    );
  }

  return errors;
}