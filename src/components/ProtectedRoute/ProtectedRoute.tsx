import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  subscribeToBans,
  type Ban,
} from "../../lib/bans";

import BanScreen from "../BanScreen/BanScreen";

interface Props {
  deviceId: string;
  children: ReactNode;
}

export default function ProtectedRoute({
  deviceId,
  children,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [ban, setBan] = useState<Ban | null>(
    null
  );

  useEffect(() => {
    return subscribeToBans((bans) => {
      const now = Date.now();

      const matchingBan = bans.find(
        (ban) =>
          ban.deviceId === deviceId &&
          (
            ban.expiresAt === null ||
            ban.expiresAt > now
          )
      );

      setBan(matchingBan ?? null);
      setLoading(false);
    });
  }, [deviceId]);

  if (loading) {
    return (
      <div className="center-screen">
        Checking access...
      </div>
    );
  }

  if (ban) {
    return (
      <BanScreen
        deviceId={deviceId}
        reason={ban.reason}
        expiresAt={ban.expiresAt}
      />
    );
  }

  return <>{children}</>;
}