import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/firebase";
import { isAdmin } from "../lib/admin";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      try {
        const admin = await isAdmin(user.uid);
        setAllowed(admin);
      } catch (error) {
        console.error(error);
        setAllowed(false);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="center-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}