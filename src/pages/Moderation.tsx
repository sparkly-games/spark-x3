import { FormEvent, useEffect, useState } from "react";
import {
  createBan,
  deleteBan,
  subscribeToBans,
  type Ban,
} from "../lib/bans";

function formatDate(timestamp: number | null) {
  if (timestamp === null) return "Permanent";

  return new Date(timestamp).toLocaleString();
}

export default function Moderation() {
  const [bans, setBans] = useState<Ban[]>([]);

  const [deviceId, setDeviceId] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("86400000");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    return subscribeToBans(setBans);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!deviceId.trim() || !reason.trim()) {
      return;
    }

    setCreating(true);

    try {
      const durationMs =
        duration === "permanent"
          ? null
          : Number(duration);

      await createBan(
        deviceId.trim(),
        reason.trim(),
        durationMs
      );

      setDeviceId("");
      setReason("");
      setDuration("86400000");
    } catch (error) {
      console.error(error);
      alert("Failed to create ban.");
    } finally {
      setCreating(false);
    }
  }

  async function unban(id: string) {
    if (!confirm("Remove this restriction?")) {
      return;
    }

    try {
      await deleteBan(id);
    } catch (error) {
      console.error(error);
      alert("Failed to remove ban.");
    }
  }

  const activeBans = bans.filter(
    (ban) =>
      ban.expiresAt === null ||
      ban.expiresAt > Date.now()
  );

  return (
    <>
      <header className="page-header">
        <div>
          <h1>Moderation</h1>
          <p>Manage visitor restrictions.</p>
        </div>
      </header>

      <section className="panel">
        <h2>Create restriction</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Device ID
            <input
              value={deviceId}
              onChange={(e) =>
                setDeviceId(e.target.value)
              }
              placeholder="Device ID"
            />
          </label>

          <label>
            Reason
            <input
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Reason for restriction"
            />
          </label>

          <label>
            Duration
            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            >
              <option value="600000">
                10 minutes
              </option>

              <option value="3600000">
                1 hour
              </option>

              <option value="86400000">
                24 hours
              </option>

              <option value="604800000">
                7 days
              </option>

              <option value="2592000000">
                30 days
              </option>

              <option value="permanent">
                Permanent
              </option>
            </select>
          </label>

          <button
            className="primary-button"
            disabled={creating}
          >
            {creating ? "Creating..." : "Create restriction"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Active restrictions</h2>
          <span>{activeBans.length}</span>
        </div>

        {activeBans.length === 0 ? (
          <div className="empty-state">
            No active restrictions.
          </div>
        ) : (
          <div className="ban-list">
            {activeBans.map((ban) => (
              <div className="ban-card" key={ban.id}>
                <div>
                  <div className="ban-reference">
                    {ban.id}
                  </div>

                  <div className="ban-reason">
                    {ban.reason}
                  </div>

                  <div className="ban-meta">
                    Device: {ban.deviceId}
                  </div>

                  <div className="ban-meta">
                    Expires: {formatDate(ban.expiresAt)}
                  </div>
                </div>

                <button
                  className="danger-button"
                  onClick={() => unban(ban.id)}
                >
                  Unban
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}