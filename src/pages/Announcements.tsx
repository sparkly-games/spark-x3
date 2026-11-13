import { type FormEvent, useEffect, useState } from "react";

import {
  createAnnouncement,
  deleteAnnouncement,
  setAnnouncementEnabled,
  subscribeToAnnouncements,
  type Announcement,
  type AnnouncementType,
} from "../lib/announcements";

function formatDate(timestamp: number | null) {
  if (timestamp === null) return "Never";

  return new Date(timestamp).toLocaleString();
}

function isExpired(announcement: Announcement) {
  return (
    announcement.expiresAt !== null &&
    announcement.expiresAt <= Date.now()
  );
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<
    Announcement[]
  >([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] =
    useState<AnnouncementType>("info");
  const [expiresAt, setExpiresAt] = useState("");

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    return subscribeToAnnouncements(setAnnouncements);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const expiry = expiresAt
      ? new Date(expiresAt).getTime()
      : null;

    if (
      expiry !== null &&
      (!Number.isFinite(expiry) ||
        expiry <= Date.now())
    ) {
      alert("Expiration must be in the future.");
      return;
    }

    setCreating(true);

    try {
      await createAnnouncement(
        title.trim(),
        message.trim(),
        type,
        expiry
      );

      setTitle("");
      setMessage("");
      setType("info");
      setExpiresAt("");
    } catch (error) {
      console.error(error);
      alert("Failed to create announcement.");
    } finally {
      setCreating(false);
    }
  }

  async function toggleAnnouncement(
    announcement: Announcement
  ) {
    try {
      await setAnnouncementEnabled(
        announcement.id,
        !announcement.enabled
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update announcement.");
    }
  }

  async function removeAnnouncement(id: string) {
    if (!confirm("Delete this announcement?")) {
      return;
    }

    try {
      await deleteAnnouncement(id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete announcement.");
    }
  }

  const activeAnnouncements = announcements.filter(
    (announcement) =>
      announcement.enabled &&
      !isExpired(announcement)
  );

  const inactiveAnnouncements = announcements.filter(
    (announcement) =>
      !announcement.enabled ||
      isExpired(announcement)
  );

  return (
    <>
      <header className="page-header">
        <div>
          <h1>Announcements</h1>

          <p>
            Manage messages shown to Spark X3 visitors.
          </p>
        </div>
      </header>

      <section className="panel">
        <h2>Create announcement</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Title

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Announcement title"
            />
          </label>

          <label>
            Message

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Announcement message"
              rows={4}
            />
          </label>

          <label>
            Type

            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as AnnouncementType
                )
              }
            >
              <option value="info">
                Information
              </option>

              <option value="success">
                Success
              </option>

              <option value="warning">
                Warning
              </option>

              <option value="critical">
                Critical
              </option>
            </select>
          </label>

          <label>
            Expiration

            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) =>
                setExpiresAt(e.target.value)
              }
            />

            <small>
              Leave empty for no expiration.
            </small>
          </label>

          <button
            className="primary-button"
            disabled={creating}
          >
            {creating
              ? "Publishing..."
              : "Publish announcement"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Active announcements</h2>

          <span>
            {activeAnnouncements.length}
          </span>
        </div>

        {activeAnnouncements.length === 0 ? (
          <div className="empty-state">
            No active announcements.
          </div>
        ) : (
          <div className="announcement-list">
            {activeAnnouncements.map(
              (announcement) => (
                <div
                  className="announcement-card"
                  key={announcement.id}
                >
                  <div>
                    <div className="announcement-reference">
                      {announcement.id}
                    </div>

                    <div className="announcement-title">
                      {announcement.title}
                    </div>

                    <div className="announcement-message">
                      {announcement.message}
                    </div>

                    <div className="announcement-meta">
                      Type: {announcement.type}
                    </div>

                    <div className="announcement-meta">
                      Expires:{" "}
                      {formatDate(
                        announcement.expiresAt
                      )}
                    </div>
                  </div>

                  <div className="announcement-actions">
                    <button
                      className="secondary-button"
                      onClick={() =>
                        toggleAnnouncement(
                          announcement
                        )
                      }
                    >
                      Disable
                    </button>

                    <button
                      className="danger-button"
                      onClick={() =>
                        removeAnnouncement(
                          announcement.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Inactive announcements</h2>

          <span>
            {inactiveAnnouncements.length}
          </span>
        </div>

        {inactiveAnnouncements.length === 0 ? (
          <div className="empty-state">
            No inactive announcements.
          </div>
        ) : (
          <div className="announcement-list">
            {inactiveAnnouncements.map(
              (announcement) => (
                <div
                  className="announcement-card"
                  key={announcement.id}
                >
                  <div>
                    <div className="announcement-reference">
                      {announcement.id}
                    </div>

                    <div className="announcement-title">
                      {announcement.title}
                    </div>

                    <div className="announcement-message">
                      {announcement.message}
                    </div>

                    <div className="announcement-meta">
                      Status:{" "}
                      {!announcement.enabled
                        ? "Disabled"
                        : "Expired"}
                    </div>

                    <div className="announcement-meta">
                      Expires:{" "}
                      {formatDate(
                        announcement.expiresAt
                      )}
                    </div>
                  </div>

                  <div className="announcement-actions">
                    {!isExpired(announcement) && (
                      <button
                        className="secondary-button"
                        onClick={() =>
                          toggleAnnouncement(
                            announcement
                          )
                        }
                      >
                        Enable
                      </button>
                    )}

                    <button
                      className="danger-button"
                      onClick={() =>
                        removeAnnouncement(
                          announcement.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </>
  );
}