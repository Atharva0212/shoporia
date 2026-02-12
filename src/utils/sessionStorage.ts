export function setSessionItem<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionItem<T>(key: string): T | null {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function removeSessionItem(key: string): void {
  sessionStorage.removeItem(key);
}
