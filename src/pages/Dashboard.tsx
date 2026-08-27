import { useEffect, useState } from "react";
import { Flag, Gamepad2, Megaphone, ShieldBan } from "lucide-react";

import { subscribeToBans, type Ban as BanType } from "../lib/bans";
import { SITE_NAME } from "../config";

export default function Dashboard() {
  const [bans, setBans] = useState<BanType[]>([]);

  useEffect(() => {
    return subscribeToBans(setBans);
  }, []);

  const activeBans = bans.filter(
    (ban) =>
      ban.expiresAt === null ||
      ban.expiresAt > Date.now()
  );

  return (
    <>
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>{SITE_NAME} administration overview.</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <ShieldBan />
          <div>
            <span>Active bans</span>
            <strong>{activeBans.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <Megaphone />
          <div>
            <span>Announcements</span>
            <strong>0</strong>
          </div>
        </div>
      </div>

      <section className="panel">
        <h2>Welcome</h2>
        <p>
          Use the sidebar to manage user bans.
        </p>
      </section>
    </>
  );
}