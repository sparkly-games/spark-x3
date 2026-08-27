import { getFunctions, httpsCallable } from "firebase/functions";

import { app } from "./firebase";

const functions = getFunctions(app);

interface BanCheckResponse {
  banned: boolean;
  reason: string | null;
  expiresAt: number | null;
}

export async function checkBan(
  deviceId: string
): Promise<BanCheckResponse> {
  const checkBanFunction = httpsCallable<
    { deviceId: string },
    BanCheckResponse
  >(functions, "checkBan");

  const result = await checkBanFunction({
    deviceId,
  });

  return result.data;
}