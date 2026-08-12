import { signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth, googleProvider } from "../lib/firebase";
import { ADMIN_NAME } from "../config";
import { SITE_NAME } from "../config";
import { ShieldX } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user);
      setLoading(false);
    });
  }, []);

  async function login() {
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );
    }
  }

  if (loading) {
    return (
      <div className="center-screen">
        Loading...
      </div>
    );
  }

  if (signedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="login-screen">
      <div className="login-card">

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <ShieldX size={72} />
        </div>

        <div className="brand-title">{SITE_NAME}</div>
        <div className="brand-subtitle">
          {ADMIN_NAME}
        </div>

        <h1>Sign in</h1>

        <p>
          This area is restricted to administrators.
        </p>

        <button
          className="primary-button"
          onClick={login}
        >
          <div style={{ width: "10px" }} />
          Continue with Google
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}