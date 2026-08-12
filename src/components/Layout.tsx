import {
  LayoutDashboard,
  ShieldBan,
  Flag,
  Gamepad2,
  Megaphone,
  Activity,
  LogOut,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ADMIN_NAME } from "../config";
import { SITE_NAME } from "../config";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Moderation",
    path: "/moderation",
    icon: ShieldBan,
  }
];

export default function Layout() {
  async function logout() {
    await signOut(auth);
  }

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-title">{SITE_NAME}</div>
          <div className="brand-subtitle">{ADMIN_NAME}</div>
        </div>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button className="logout-button" onClick={logout}>
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}