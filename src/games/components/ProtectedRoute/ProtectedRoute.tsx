import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  subscribeToBans,
  type Ban,
} from "../../lib/bans";

import BanScreen from "../BanScreen/BanScreen";
import { useLanguage } from "../../../localisation/LanguageContext";

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

  const strings = useLanguage().lang.src;
  const navigate = useNavigate();

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
      if (!ban) {
        navigate("/games");
      }
    });
  }, [deviceId]);

  if (loading) {
    return (
      <div className="center-screen">
        {strings.pages.play.loadingGameTextLine2}
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