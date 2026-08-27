import {
  ref,
  set,
  remove,
  onValue,
  type Unsubscribe,
} from "firebase/database";

import { database } from "./firebase";

export interface Ban {
  id: string;
  deviceId: string;
  reason: string;
  createdAt: number;
  expiresAt: number | null;
}

export function subscribeToBans(
  callback: (bans: Ban[]) => void
): Unsubscribe {
  const bansRef = ref(database, "bans");

  return onValue(bansRef, (snapshot) => {
    const value = snapshot.val();

    if (!value) {
      callback([]);
      return;
    }

    const bans: Ban[] = Object.entries(value).map(
      ([deviceId, data]) => ({
        id: deviceId,
        deviceId,
        ...(data as Omit<Ban, "id" | "deviceId">),
      })
    );

    callback(
      bans.sort((a, b) => b.createdAt - a.createdAt)
    );
  });
}

export async function createBan(
  deviceId: string,
  reason: string,
  durationMs: number | null
) {
  const banRef = ref(database, `bans/${deviceId}`);

  const ban = {
    deviceId,
    reason,
    createdAt: Date.now(),
    expiresAt:
      durationMs === null
        ? null
        : Date.now() + durationMs,
  };

  await set(banRef, ban);

  return deviceId;
}

export async function deleteBan(deviceId: string) {
  await remove(ref(database, `bans/${deviceId}`));
}