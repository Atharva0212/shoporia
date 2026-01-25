export function getFromStorage<T>(STORAGE_KEY:string): T | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveToStorage<T>(data: T,STORAGE_KEY:string): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
