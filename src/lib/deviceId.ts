const STORAGE_KEY = "spark-x3-device-id";

function generateDeviceId(): string {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export function getDeviceId(): string {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const id = generateDeviceId();

  localStorage.setItem(STORAGE_KEY, id);

  return id;
}