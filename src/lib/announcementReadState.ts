const STORAGE_KEY =
  "sparkx3_read_announcements";

export function getReadAnnouncementIds(): string[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function markAnnouncementRead(
  id: string
) {
  const ids = getReadAnnouncementIds();

  if (ids.includes(id)) {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...ids, id])
  );
}

export function markAllAnnouncementsRead(
  announcements: { id: string }[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      announcements.map(
        (announcement) => announcement.id
      )
    )
  );
}