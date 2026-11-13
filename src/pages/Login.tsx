
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "../lib/firebase";
import { ADMIN_NAME, SITE_NAME } from "../config";
import { ShieldX } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user);
      setLoading(false);
    });
  }, []);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        `${user.trim()}@example.com`,
        password
      );
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="center-screen">Loading...</div>;
  }

  if (signedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="login-screen">
      <div className="login-card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <ShieldX size={72} />
        </div>

        <div className="brand-title">{SITE_NAME}</div>
        <div className="brand-subtitle">{ADMIN_NAME}</div>

        <h1>Sign in</h1>

        <p>This area is restricted to administrators.</p>

        <form className="login-form" onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "🔒 Sign in"}
          </button>
        </form>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
