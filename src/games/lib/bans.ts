import {
  ref,
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

    const bans: Ban[] = Object.entries(value)
      .map(([id, data]) => ({
        id,
        ...(data as Omit<Ban, "id">),
      }))
      .sort(
        (a, b) => b.createdAt - a.createdAt
      );

    callback(bans);
  });
}