import { ref, get } from "firebase/database";
import { database } from "./firebase";

export async function isAdmin(uid: string): Promise<boolean> {
  const snapshot = await get(ref(database, `admins/${uid}`));

  return snapshot.exists() && snapshot.val() === true;
}